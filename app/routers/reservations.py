from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.auth import JWTUser
from ..schemas.reservation import APIReservation
from ..crud.reservations import get_reservations
from ..dependencies import get_db, get_user_from_token

router = APIRouter(prefix='/api/reservations')

@router.get('/', response_model=List[APIReservation])
def list_my_reservations(user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    return get_reservations(db, for_user=user.id)
