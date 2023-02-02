from time import sleep
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..dependencies import get_db, get_user_from_token
from ..schemas.auth import JWTUser
from ..schemas.restaurant import APIRestaurant, APIRestaurantCreate, RestaurantCreate
from ..crud.restaurants import create_restaurant, get_restaurants

router = APIRouter(prefix='/api/admin')

@router.get('/restaurants', response_model=List[APIRestaurant])
def restaurants(user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    sleep(1)
    if not user.is_admin:
        raise HTTPException(403, 'Admins only')
    
    return get_restaurants(db, for_owner=user.id)

@router.post('/restaurants', response_model=APIRestaurant)
def add_restaraunt(restaraunt: APIRestaurantCreate, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not user.is_admin:
        raise HTTPException(403, 'Admin only')

    restaraunt = RestaurantCreate(name=restaraunt.name, about=restaraunt.about, owner_id=user.id)
    return create_restaurant(db, restaraunt)
