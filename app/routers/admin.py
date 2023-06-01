import shutil
import secrets
from typing import List
from os import getcwd, path
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session

from ..crud.users import get_user
from ..crud.images import create_image
from ..crud.schedules import create_schedule
from ..schemas.auth import JWTUser
from ..schemas.ok import APIOk
from ..dependencies import get_db, get_user_from_token
from ..crud.restaurants import create_restaurant, get_restaurant, get_restaurants
from ..schemas.restaurant import APIRestaurantCreate, APIRestaurantFull, RestaurantCreate

router = APIRouter(prefix='/api/admin')

@router.get('/restaurants', response_model=List[APIRestaurantFull])
def restaurants(user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not user.is_admin:
        raise HTTPException(403, 'Admins only')
    
    return get_restaurants(db, for_owner=user.id)

@router.post('/restaurants', response_model=APIRestaurantFull)
def add_restaurant(restaraunt: APIRestaurantCreate, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not user.is_admin:
        raise HTTPException(403, 'Admin only')
    
    archilogic_token = get_user(db, by_id=user.id).archilogic_public_token
    restaurant = RestaurantCreate(
        **restaraunt.dict(),
        owner_id=user.id, 
        archilogic_token=archilogic_token
    )
    
    db_restaurant = create_restaurant(db, restaurant)
    return create_schedule(db, db_restaurant, restaraunt.schedules)

@router.post("/restaurants/{restaurant_id}/images", response_model=APIOk)
async def create_upload_files(restaurant_id: int, files: list[UploadFile], user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not user.is_admin:
        raise HTTPException(403, 'Admin only')
    
    restaurant = get_restaurant(db, by_id=restaurant_id)
    if not restaurant:
        raise HTTPException(404, 'Restaurant does not exists')

    for file in files:
        file_ext = path.splitext(file.filename)[1]
        file_name = f'{secrets.token_urlsafe(16)}{file_ext}'
        file_path = path.join(getcwd(), "uploads", file_name)
        try:
            with open(file_path, 'wb') as f:
                shutil.copyfileobj(file.file, f)
        except Exception as e:
            print(e)
            raise HTTPException(500, 'Error while uploading images')
        finally:
            create_image(db, file_name, restaurant_id)
        

    return APIOk(status="ok")
