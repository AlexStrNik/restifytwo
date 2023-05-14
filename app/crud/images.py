from sqlalchemy.orm import Session

from ..models.image import RestaurantImage

def create_image(db: Session, path: str, restaurant_id: int):
    db_image = RestaurantImage(
        path=path,
        restaurant_id=restaurant_id,
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)

    return db_image
