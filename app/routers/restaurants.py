from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..dependencies import get_db, get_user_from_token
from ..schemas.auth import JWTUser
from ..schemas.restaurant import APIRestaurantCreate, RestaurantCreate, APIRestaurant
from ..crud.restaurants import get_restaurants, create_restaurant

router = APIRouter(prefix='/api/restaurants')

@router.get('/', response_model=List[APIRestaurant])
def list_restaurants(db: Session = Depends(get_db)):
    return get_restaurants(db)

@router.post('/', response_model=APIRestaurant)
def add_restaraunt(restaraunt: APIRestaurantCreate, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not user.is_admin:
        raise HTTPException(403, 'Only admins can add restaraunts')

    restaraunt = RestaurantCreate(name=restaraunt.name, owner_id=user.id)
    return create_restaurant(db, restaraunt)
