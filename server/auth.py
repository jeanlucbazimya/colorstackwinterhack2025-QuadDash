import secrets
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from . import schemas
from .config import settings
from .database import get_db
from .email_service import EmailService, get_email_service
from .models import User, UserRole, VerificationCode
from .security import create_access_token, decode_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def _validate_university_email(email: str, university_key: str) -> str:
    domain = email.split("@")[-1].lower()

    # Reject non-.edu emails
    if not domain.endswith(".edu"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only .edu email addresses are allowed")

    university = settings.universities.get(university_key)
    if not university:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unknown university")
    allowed_domains: List[str] = [d.lower() for d in university.get("domains", [])]
    if domain not in allowed_domains:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email must use a school domain")
    return university["name"]


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    """Dependency to get the current authenticated and verified user."""
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not user.is_verified:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email not verified")

    return user


@router.get("/universities", response_model=schemas.UniversitiesResponse)
def list_universities():
    universities = [
        schemas.University(key=key, name=info["name"], domains=info.get("domains", []))
        for key, info in settings.universities.items()
    ]
    return schemas.UniversitiesResponse(universities=universities)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    payload: schemas.RegisterRequest,
    db: Session = Depends(get_db),
    email_service: EmailService = Depends(get_email_service),
):
    university_name = _validate_university_email(payload.email, payload.university_key)

    user = db.query(User).filter(User.email == payload.email).first()
    if user and user.is_verified:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    if not user:
        user = User(
            email=payload.email.lower(),
            hashed_password=hash_password(payload.password),
            full_name=payload.full_name,
            role=payload.role,
            university_key=payload.university_key,
            license_plate=payload.license_plate,
        )
        db.add(user)
        db.flush()  # to get user.id for FK
    else:
        user.hashed_password = hash_password(payload.password)
        user.full_name = payload.full_name
        user.role = payload.role
        user.university_key = payload.university_key
        user.license_plate = payload.license_plate

    # Invalidate previous codes
    db.query(VerificationCode).filter(
        VerificationCode.user_id == user.id, VerificationCode.consumed.is_(False)
    ).update({VerificationCode.consumed: True})

    code = f"{secrets.randbelow(1_000_000):06d}"
    code_hash = hash_password(code)
    verification = VerificationCode(
        user_id=user.id,
        code_hash=code_hash,
        expires_at=VerificationCode.expiry_from_now(30),
        consumed=False,
    )
    db.add(verification)
    db.commit()

    email_service.send_verification_email(recipient=user.email, code=code, university_name=university_name)

    return {"message": "Registration started. Check your school email for the code."}


@router.post("/verify-email", response_model=schemas.TokenResponse)
def verify_email(payload: schemas.VerifyEmailRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    code_row = (
        db.query(VerificationCode)
        .filter(
            VerificationCode.user_id == user.id,
            VerificationCode.consumed.is_(False),
            VerificationCode.expires_at >= datetime.utcnow(),
        )
        .order_by(VerificationCode.created_at.desc())
        .first()
    )
    if not code_row:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active verification code")

    if not verify_password(payload.code, code_row.code_hash):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid code")

    code_row.consumed = True
    user.is_verified = True
    db.commit()

    token = create_access_token(subject=str(user.id))
    return schemas.TokenResponse(access_token=token)


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not user.is_verified:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email not verified")

    token = create_access_token(subject=str(user.id))
    return schemas.TokenResponse(access_token=token)


@router.get("/me", response_model=schemas.UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user