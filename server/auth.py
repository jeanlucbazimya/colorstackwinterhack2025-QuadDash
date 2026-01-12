import secrets
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from . import schemas
from .config import settings
from .database import get_db
from .models import User
from .security import create_access_token, decode_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def _validate_university_email(email: str, university_key: str) -> str:
    """Ensure the email belongs to a valid university domain."""
    domain = email.split("@")[-1].lower()

    # Reject non-.edu emails
    if not domain.endswith(".edu"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only .edu email addresses are allowed"
        )

    university = settings.universities.get(university_key)
    if not university:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Unknown university"
        )

    allowed_domains: List[str] = [d.lower() for d in university.get("domains", [])]
    if domain not in allowed_domains:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email must use a school domain"
        )

    return university["name"]


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    """Dependency to get the current authenticated user."""
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return user


@router.get("/universities", response_model=schemas.UniversitiesResponse)
def list_universities():
    universities = [
        schemas.University(key=key, name=info["name"], domains=info.get("domains", []))
        for key, info in settings.universities.items()
    ]
    return schemas.UniversitiesResponse(universities=universities)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(payload: schemas.RegisterRequest, db: Session = Depends(get_db)):
    """Register a user and mark them as verified immediately."""
    _validate_university_email(payload.email, payload.university_key)

    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user = User(
        email=payload.email.lower(),
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        role=payload.role,
        university_key=payload.university_key,
        license_plate=payload.license_plate,
        is_verified=True  # mark as verified immediately
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(subject=str(user.id))
    return {"message": "Registration successful", "access_token": token}


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(subject=str(user.id))
    return schemas.TokenResponse(access_token=token)


@router.get("/me", response_model=schemas.UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user
