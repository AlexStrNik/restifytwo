import requests
from fastapi import APIRouter, Depends, HTTPException

from ..models.user import User
from ..schemas.auth import JWTUser
from ..schemas.archilogic import APIFloor
from ..crud.users import get_user
from ..dependencies import get_db, get_user_from_token

router = APIRouter(prefix='/api/archilogic')

def map_floor(floor):
    return APIFloor(id=floor['id'], name=floor['properties']['name'])

@router.get('/floors')
def list_floors(db = Depends(get_db), user: JWTUser = Depends(get_user_from_token)):
    if (not user.is_admin):
        raise HTTPException(403, 'Admins only')

    archilogic_token = get_user(db, by_id=user.id).archilogic_token
    resp = requests.get(f'https://api.archilogic.com/v2/floor', headers={
        'Authorization': f'AL-Secret-Token {archilogic_token}',
    })
    resp = resp.json()

    return [map_floor(floor) for floor in resp['features']]
