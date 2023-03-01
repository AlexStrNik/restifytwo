from time import sleep
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..schemas.restaurant import APIRestaurant
from ..crud.restaurants import get_restaurant, get_restaurants

router = APIRouter(prefix='/api/restaurants')

@router.get('/', response_model=List[APIRestaurant])
def list_restaurants(db: Session = Depends(get_db)):
    sleep(1)
    return get_restaurants(db)

@router.get('/{restaurant_id}', response_model=APIRestaurant)
def list_restaurants(restaurant_id: int, db: Session = Depends(get_db)):
    sleep(1)
    return get_restaurant(db, by_id=restaurant_id)
