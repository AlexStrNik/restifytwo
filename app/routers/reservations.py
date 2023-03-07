from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..schemas.reservation import APIReservation
from ..crud.reservations import get_reservations

router = APIRouter(prefix='/api/reservations')

@router.get('/table/{table_id}', response_model=List[APIReservation])
def list_reservations(table_id: str, db: Session = Depends(get_db)):
    print(get_reservations(db, for_table=table_id))
    return get_reservations(db, for_table=table_id)
