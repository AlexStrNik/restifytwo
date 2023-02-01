import bcrypt
from sqlalchemy.orm import Session

from ..models.user import User
from ..schemas.user import UserCreate, User as UserScheme

def get_user(db: Session, by_email: str = None, by_id: int = None) -> UserScheme:
    query = db.query(User)
    
    if by_email:
        query = query.filter(User.email == by_email)
    elif by_id:
        query = query.filter(User.id == by_id)

    return query.first()

def create_user(db: Session, user: UserCreate) -> UserScheme:
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    db_user = User(email=user.email, name=user.name, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
