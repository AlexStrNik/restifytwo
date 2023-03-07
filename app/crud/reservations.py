from typing import List
from datetime import date
from sqlalchemy.orm import Session

from ..models.reservation import Reservation
from ..schemas.reservation import ReservationCreate, Reservation as ReservationScheme

def get_reservations(db: Session, for_user: int = None, for_restaurant: int = None, for_table: str = None) -> List[ReservationScheme]:
    query = db.query(Reservation)
    
    if for_user:
        query = query.filter(Reservation.guest_id == for_user)
    if for_restaurant:
        query = query.filter(Reservation.restaurant_id == for_restaurant)
    if for_table:
        query = query.filter(Reservation.table_id == for_table)
    
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
