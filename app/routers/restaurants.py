from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..schemas.restaurant import APIRestaurant
from ..crud.restaurants import get_restaurants

router = APIRouter(prefix='/api/restaurants')

@router.get('/', response_model=List[APIRestaurant])
def list_restaurants(db: Session = Depends(get_db)):
    return get_restaurants(db)
