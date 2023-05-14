from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..dependencies import get_db, get_user_from_token
from ..schemas.auth import JWTUser
from ..schemas.restaurant import APIRestaurantFull
from ..schemas.review import APIReview, APIReviewCreate, ReviewCreate
from ..schemas.reservation import APIReservation, APIReservationCreate, ReservationCreate
from ..crud.reviews import create_review, get_reviews
from ..crud.restaurants import get_restaurant, get_restaurants
from ..crud.reservations import create_reservation, get_reservations

router = APIRouter(prefix='/api/restaurants')

@router.get('/', response_model=List[APIRestaurantFull])
def list_restaurants(db: Session = Depends(get_db)):
    return get_restaurants(db)

@router.get('/{restaurant_id}', response_model=APIRestaurantFull)
def list_restaurants(restaurant_id: int, db: Session = Depends(get_db)):
    return get_restaurant(db, by_id=restaurant_id)

@router.get('/{restaurant_id}/reservaions/{table_id}', response_model=List[APIReservation])
def list_reservations(restaurant_id: int, table_id: str, db: Session = Depends(get_db)):
    return get_reservations(db, for_table=table_id, for_restaurant=restaurant_id)

@router.post('/{restaurant_id}/reservaions/{table_id}', response_model=APIReservation)
def reservation_create(reservation: APIReservationCreate, restaurant_id: int, table_id: str, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    return create_reservation(db, ReservationCreate(
        restaurant_id=restaurant_id,
        table_id=table_id,
        guest_id=user.id,
        guests_count=reservation.guests_count,
        date=reservation.date
    ))

@router.post('/{restaurant_id}/reviews/', response_model=APIReview)
def review_create(review: APIReviewCreate, restaurant_id: int, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    return create_review(
        db,
        ReviewCreate(
            restaurant_id=restaurant_id,
            author_id=user.id,
            review=review.review,
            rating=review.rating
        )
    )

@router.get('/{restaurant_id}/reviews/', response_model=List[APIReview])
def list_reviews(restaurant_id: int, db: Session = Depends(get_db)):
    return get_reviews(
        db,
        for_restaurant=restaurant_id
    )
