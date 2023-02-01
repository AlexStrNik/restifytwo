from typing import List
from datetime import date
from sqlalchemy.orm import Session

from ..models.reservation import Reservation
from ..schemas.reservation import ReservationCreate, Reservation as ReservationScheme

def get_reservations(db: Session, for_user: int = None, for_restaraunt: int = None, for_date: date = None) -> List[ReservationScheme]:
    query = db.query(Reservation)
    
    if for_user:
        query = query.filter(Reservation.guest_id == for_user)
    if for_restaraunt:
        query = query.filter(Reservation.restaurant_id == for_restaraunt)
    if for_date:
        query = query.filter(Reservation.date == for_date)
    
    return query.all()

def create_reservation(db: Session, reservation: ReservationCreate) -> ReservationScheme:
    db_reservation = Reservation(
        guests_count=reservation.guests_count, 
        date=reservation.date, 
        restaurant_id=reservation.restaurant_id,
        table_id=reservation.table_id
    )
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)

    return db_reservation
