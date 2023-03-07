from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..schemas.restaurant import APIRestaurant
from ..schemas.reservation import APIReservation
from ..crud.restaurants import get_restaurant, get_restaurants
from ..crud.reservations import get_reservations

router = APIRouter(prefix='/api/restaurants')

@router.get('/', response_model=List[APIRestaurant])
def list_restaurants(db: Session = Depends(get_db)):
    return get_restaurants(db)

@router.get('/{restaurant_id}', response_model=APIRestaurant)
def list_restaurants(restaurant_id: int, db: Session = Depends(get_db)):
    return get_restaurant(db, by_id=restaurant_id)

@router.get('/{restaurant_id}/reservaions/{table_id}', response_model=List[APIReservation])
def list_restaurants(restaurant_id: int, table_id: str, db: Session = Depends(get_db)):
    return get_reservations(db, for_table=table_id)
