import { useList, useStore } from "effector-react";
import { useEffect } from "react";

import { Card } from "../../components/Card";
import { Restaurant } from "../Restaurant";

import {
  $restaurants,
  loadRestaurantsFx,
  loadRestaurants,
} from "../../models/restaurants";
import { $route, navigateTo } from "../../models/router";
import { APIRestaurant } from "../../api/types";

import "./index.css";

export const Restaurants = () => {
  useEffect(() => {
    loadRestaurants();
  }, []);

  const selectedSubPage = useStore(
    $route.map((route) => route.replace("/restaurants", ""))
  );

  const restaurantsLoading = useStore(loadRestaurantsFx.pending);
  const restaurants = useList($restaurants, (restaurant: APIRestaurant) => (
    <Card
      onClick={() => navigateTo(`/restaurants/${restaurant.id}`)}
      title={restaurant.name}
      description={restaurant.about}
    />
  ));

  return (
    <div className="RestaurantsPage">
      <div className="RestaurantsPage-List">
        <h1 className="RestaurantsPage-Header">Restaurants</h1>
        <div className="RestaurantsPage-Restaurants">
          {restaurantsLoading
            ? [...Array(10).keys()].map((i) => (
                <Card loading key={i} title={`Loading ${i}`} />
              ))
            : restaurants}
        </div>
      </div>
      {selectedSubPage !== "" ? (
        <Restaurant id={Number.parseInt(selectedSubPage.slice(1))} />
      ) : null}
    </div>
  );
};
