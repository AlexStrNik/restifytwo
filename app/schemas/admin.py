from .user import User
from .reservation import Reservation


class ReservationAdmin(Reservation):
    guest: User


class APIReservationAdmin(ReservationAdmin):
    pass
