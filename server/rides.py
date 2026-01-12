from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from . import schemas
from .auth import get_current_user
from .database import get_db
from .models import RideRequest, RideStatus, User, UserRole, Review

router = APIRouter(prefix="/rides", tags=["rides"])


@router.post("/", response_model=schemas.RideRequestOut, status_code=status.HTTP_201_CREATED)
def create_ride_request(
    payload: schemas.RideRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new ride request. Only riders can create requests."""
    if current_user.role != UserRole.rider:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only riders can create ride requests",
        )

    # Check for existing active request (pending or accepted)
    existing = (
        db.query(RideRequest)
        .filter(
            RideRequest.rider_id == current_user.id,
            RideRequest.status.in_([RideStatus.pending, RideStatus.accepted]),
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have an active ride request",
        )

    # Create ride request
    ride = RideRequest(
        rider_id=current_user.id,
        university_key=current_user.university_key,
        pickup_location=payload.pickup_location,
        destination=payload.destination,
        ride_date=payload.ride_date,
    )
    db.add(ride)
    db.commit()
    db.refresh(ride)
    return ride


@router.get("/my-request", response_model=Optional[schemas.RideRequestOut])
def get_my_request(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get the rider's current active request (pending or accepted)."""
    if current_user.role != UserRole.rider:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only riders can view their requests",
        )

    ride = (
        db.query(RideRequest)
        .filter(
            RideRequest.rider_id == current_user.id,
            RideRequest.status.in_([RideStatus.pending, RideStatus.accepted]),
        )
        .first()
    )

    return ride  # Returns null if no active request


@router.get("/pending", response_model=schemas.RideRequestListResponse)
def get_pending_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get pending ride requests for the driver's university."""
    if current_user.role != UserRole.driver:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can view pending requests",
        )

    rides = (
        db.query(RideRequest)
        .filter(
            RideRequest.university_key == current_user.university_key,
            RideRequest.status == RideStatus.pending,
        )
        .order_by(RideRequest.ride_date.asc())
        .all()
    )

    return schemas.RideRequestListResponse(rides=rides)


@router.post("/{ride_id}/respond", response_model=schemas.RideRequestOut)
def respond_to_request(
    ride_id: int,
    payload: schemas.RideRequestAction,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Accept or decline a ride request. Only drivers can respond."""
    if current_user.role != UserRole.driver:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can respond to requests",
        )

    ride = db.query(RideRequest).filter(RideRequest.id == ride_id).first()
    if not ride:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ride request not found",
        )

    if ride.university_key != current_user.university_key:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot respond to requests from other universities",
        )

    if ride.status != RideStatus.pending:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request is no longer pending",
        )

    if payload.action == "accept":
        ride.status = RideStatus.accepted
        ride.driver_id = current_user.id
    else:
        ride.status = RideStatus.declined

    db.commit()
    db.refresh(ride)
    return ride


@router.get("/my-accepted", response_model=schemas.RideRequestListResponse)
def get_my_accepted_rides(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get rides that this driver has accepted."""
    if current_user.role != UserRole.driver:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can view accepted rides",
        )

    rides = (
        db.query(RideRequest)
        .filter(
            RideRequest.driver_id == current_user.id,
            RideRequest.status == RideStatus.accepted,
        )
        .order_by(RideRequest.ride_date.asc())
        .all()
    )

    return schemas.RideRequestListResponse(rides=rides)


@router.post("/{ride_id}/cancel", response_model=schemas.RideRequestOut)
def cancel_ride_request(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Cancel a ride request. Only riders can cancel their own requests."""
    if current_user.role != UserRole.rider:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only riders can cancel ride requests",
        )

    ride = db.query(RideRequest).filter(RideRequest.id == ride_id).first()
    if not ride:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ride request not found",
        )

    if ride.rider_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only cancel your own ride requests",
        )

    if ride.status not in [RideStatus.pending, RideStatus.accepted]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can only cancel pending or accepted rides",
        )

    ride.status = RideStatus.cancelled
    db.commit()
    db.refresh(ride)
    return ride


@router.post("/{ride_id}/complete", response_model=schemas.RideRequestOut)
def complete_ride(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Mark a ride as completed. Only drivers can complete rides."""
    if current_user.role != UserRole.driver:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can complete rides",
        )

    ride = db.query(RideRequest).filter(RideRequest.id == ride_id).first()
    if not ride:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ride request not found",
        )

    if ride.driver_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only complete rides you accepted",
        )

    if ride.status != RideStatus.accepted:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can only complete accepted rides",
        )

    ride.status = RideStatus.completed
    db.commit()
    db.refresh(ride)
    return ride

@router.post("/{ride_id}/review", response_model=schemas.ReviewOut)
def submit_review(
    ride_id: int,
    payload: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Submit a review for a completed ride. Only riders can submit reviews."""
    if current_user.role != UserRole.rider:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only riders can submit reviews",
        )

    ride = db.query(RideRequest).filter(RideRequest.id == ride_id).first()
    if not ride:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ride request not found",
        )

    if ride.rider_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only review rides you took",
        )

    if ride.status != RideStatus.completed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can only review completed rides",
        )

    # Check if review already exists
    existing_review = db.query(Review).filter(Review.ride_id == ride_id).first()
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already reviewed this ride",
        )

    review = Review(
        ride_id=ride_id,
        reviewer_id=current_user.id,
        rating=payload.rating,
        comment=payload.comment,
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


@router.get("/{ride_id}/review", response_model=Optional[schemas.ReviewOut])
def get_ride_review(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get review for a ride if it exists."""
    ride = db.query(RideRequest).filter(RideRequest.id == ride_id).first()
    if not ride:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ride request not found",
        )

    # Check authorization - rider or the reviewed driver can view
    if current_user.id != ride.rider_id and current_user.id != ride.driver_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view reviews for your rides",
        )

    review = db.query(Review).filter(Review.ride_id == ride_id).first()
    return review