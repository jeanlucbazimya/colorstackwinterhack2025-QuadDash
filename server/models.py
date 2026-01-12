import enum
from datetime import datetime, timedelta

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class UserRole(str, enum.Enum):
    driver = "driver"
    rider = "rider"


class RideStatus(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    declined = "declined"
    completed = "completed"
    cancelled = "cancelled"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    university_key = Column(String, nullable=False)
    license_plate = Column(String, nullable=True)  # Required for drivers only
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    verification_codes = relationship("VerificationCode", back_populates="user", cascade="all, delete-orphan")
    ride_requests_as_rider = relationship("RideRequest", foreign_keys="RideRequest.rider_id", back_populates="rider")
    ride_requests_as_driver = relationship("RideRequest", foreign_keys="RideRequest.driver_id", back_populates="driver")


class VerificationCode(Base):
    __tablename__ = "verification_codes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    code_hash = Column(String, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    consumed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="verification_codes")

    @classmethod
    def expiry_from_now(cls, minutes: int = 30) -> datetime:
        return datetime.utcnow() + timedelta(minutes=minutes)


class RideRequest(Base):
    __tablename__ = "ride_requests"

    id = Column(Integer, primary_key=True, index=True)
    rider_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    driver_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    university_key = Column(String, nullable=False, index=True)

    pickup_location = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    ride_date = Column(DateTime, nullable=False)

    status = Column(Enum(RideStatus), default=RideStatus.pending, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    rider = relationship("User", foreign_keys=[rider_id], back_populates="ride_requests_as_rider")
    driver = relationship("User", foreign_keys=[driver_id], back_populates="ride_requests_as_driver")
    review = relationship("Review", back_populates="ride", uselist=False, cascade="all, delete-orphan")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    ride_id = Column(Integer, ForeignKey("ride_requests.id", ondelete="CASCADE"), nullable=False, unique=True)
    reviewer_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer, nullable=False)  # 1-5
    comment = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    ride = relationship("RideRequest", back_populates="review")
    reviewer = relationship("User")