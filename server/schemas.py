from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field

from .models import UserRole


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str
    role: UserRole
    university_key: str


class VerifyEmailRequest(BaseModel):
    email: EmailStr
    code: str = Field(min_length=6, max_length=6)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: UserRole
    university_key: str
    is_verified: bool
    created_at: datetime

    class Config:
        orm_mode = True


class University(BaseModel):
    key: str
    name: str
    domains: List[str]


class UniversitiesResponse(BaseModel):
    universities: List[University]