from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..crud.users import get_user
from ..schemas.auth import JWTUser
from ..dependencies import get_db, get_user_from_token
from ..crud.restaurants import create_restaurant, get_restaurants
from ..schemas.restaurant import APIRestaurant, APIRestaurantCreate, RestaurantCreate

router = APIRouter(prefix='/api/admin')

@router.get('/restaurants', response_model=List[APIRestaurant])
def restaurants(user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not user.is_admin:
        raise HTTPException(403, 'Admins only')
    
    return get_restaurants(db, for_owner=user.id)

@router.post('/restaurants', response_model=APIRestaurant)
def add_restaraunt(restaraunt: APIRestaurantCreate, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not user.is_admin:
        raise HTTPException(403, 'Admin only')

    archilogic_token = get_user(db, by_id=user.id).archilogic_secret_token
    print(archilogic_token)
    restaraunt = RestaurantCreate(
        name=restaraunt.name, 
        about=restaraunt.about, 
        floor_id=restaraunt.floor_id, 
        owner_id=user.id, 
        archilogic_token=archilogic_token
    )
    return create_restaurant(db, restaraunt)
