import { useList, useStore } from "effector-react";
import { useEffect } from "react";

import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Icon } from "../../components/Icon";
import { NewRestaurant } from "../NewRestaurant";

import {
  $myRestaurants,
  loadRestaurantsFx,
  loadRestaurants,
} from "../../models/admin";
import { $route, navigateTo } from "../../models/router";
import { APIRestaurant } from "../../api/types";

import "./index.css";

export const Admin = () => {
  useEffect(() => {
    loadRestaurants();
  }, []);

  const selectedSubPage = useStore(
    $route.map((route) => route.replace("/admin", ""))
  );

  const restaurantsLoading = useStore(loadRestaurantsFx.pending);
  const restaurants = useList($myRestaurants, (restaurant: APIRestaurant) => (
    <Card title={restaurant.name} description={restaurant.about} />
  ));

  return (
    <div className="AdminPage">
      <div className="AdminPage-List">
        <h1 className="AdminPage-Header">Admin page</h1>
        <div className="AdminPage-Restaurants">
          {restaurantsLoading ? (
            [...Array(10).keys()].map((i) => (
              <Card loading key={i} title={`Loading ${i}`} />
            ))
          ) : (
            <>
              {restaurants}
              <Button
                onClick={() => navigateTo("/admin/new")}
                className="AdminPage-RestaurantAdd"
              >
                <Icon icon="fa-square-plus" />
              </Button>
            </>
          )}
        </div>
      </div>
      {selectedSubPage === "/new" ? <NewRestaurant /> : null}
    </div>
  );
};
