import requests
from typing import List
import urllib.parse
from fastapi import APIRouter

from ..constants import PLACES_API_KEY
from ..schemas.places import APIPlacesItem, PlacesItem

router = APIRouter(prefix='/api/places')

@router.get('/search', response_model=List[APIPlacesItem])
def login(query: str):
    query = urllib.parse.quote_plus(query)
    resp = requests.get(f'https://search-maps.yandex.ru/v1/?format=json&apikey={PLACES_API_KEY}&text={query}&type=biz&lang=ru_RU')
    resp = resp.json()

    items = []
    for item in resp['features']:
        items.append(PlacesItem(
            id=item['properties']['CompanyMetaData']['id'],
            name=item['properties']['name'],
            description=item['properties']['description'],
        ))

    print(query)

    return items
