from typing import List
from sqlalchemy.orm import Session

from ..models.restaurant import Restaurant
from ..schemas.restaurant import RestaurantCreate, Restaurant as RestaurantScheme

def get_restaurants(db: Session, for_owner: int = None) -> List[RestaurantScheme]:
    if for_owner:
        return db.query(Restaurant).filter(Restaurant.owner_id == for_owner).all()

    return db.query(Restaurant).all()

def create_restaurant(db: Session, restaurant: RestaurantCreate) -> RestaurantScheme:
    db_restaurant = Restaurant(name=restaurant.name, about=restaurant.about, owner_id=restaurant.owner_id)
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)

    return db_restaurant
