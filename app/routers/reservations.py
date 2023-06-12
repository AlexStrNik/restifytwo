from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas.ok import APIOk
from ..schemas.auth import JWTUser
from ..schemas.reservation import APIReservation
from ..crud.reservations import get_reservations, get_reservation, delete_reservation
from ..dependencies import get_db, get_user_from_token

router = APIRouter(prefix='/api/reservations')

@router.get('/', response_model=List[APIReservation])
def list_my_reservations(user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    return get_reservations(db, for_user=user.id)

@router.delete('/{reservation_id}', response_model=APIOk)
def list_my_reservations(reservation_id: int, user: JWTUser = Depends(get_user_from_token), db: Session = Depends(get_db)):
    reservation = get_reservation(db, by_id=reservation_id)

    if reservation.guest.id != user.id and not user.is_admin:
        raise HTTPException(403, 'Not allowed')

    delete_reservation(db, reservation)

    return APIOk(status='ok')
