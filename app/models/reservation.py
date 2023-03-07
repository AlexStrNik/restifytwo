from sqlalchemy import Column, Integer, Date, ForeignKey, String
from sqlalchemy.orm import relationship

from ..database import Base
from .restaurant import Restaurant


class Reservation(Base):
    __tablename__ = 'reservations'

    id = Column(Integer, primary_key=True, index=True)
    guest_id = Column(Integer, ForeignKey('users.id'))
    table_id = Column(String)
    restaurant_id = Column(Integer, ForeignKey('restaurants.id'))
    guests_count = Column(Integer)
    date = Column(Date)

    guest = relationship('User', back_populates='reservations')
    restaurant = relationship('Restaurant', back_populates='reservations')
