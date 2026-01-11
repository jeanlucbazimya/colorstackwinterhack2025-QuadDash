from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field, root_validator

from .models import UserRole, RideStatus


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str
    role: UserRole
    university_key: str
    license_plate: Optional[str] = None

    @root_validator
    def validate_license_plate(cls, values):
        role = values.get("role")
        license_plate = values.get("license_plate")
        if role == UserRole.driver and not license_plate:
            raise ValueError("License plate is required for drivers")
        return values


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
    license_plate: Optional[str] = None
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


# Ride-related schemas
class RideRequestCreate(BaseModel):
    pickup_location: str = Field(min_length=1, max_length=255)
    destination: str = Field(min_length=1, max_length=255)
    ride_date: datetime


class RideRequestAction(BaseModel):
    action: str = Field(regex="^(accept|decline)$")


class RiderInfo(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        orm_mode = True


class DriverInfo(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    license_plate: Optional[str] = None

    class Config:
        orm_mode = True


class RideRequestOut(BaseModel):
    id: int
    pickup_location: str
    destination: str
    ride_date: datetime
    status: RideStatus
    created_at: datetime
    rider: RiderInfo
    driver: Optional[DriverInfo] = None

    class Config:
        orm_mode = True


class RideRequestListResponse(BaseModel):
    rides: List[RideRequestOut]