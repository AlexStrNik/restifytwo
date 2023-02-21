import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { FloorPlanEngine } from "@archilogic/floor-plan-sdk";

import { SideForm } from "../../components/SideForm";

import {
  $selectedRestaurant,
  loadRestaurant,
  loadRestaurantFx,
} from "../../models/restaurants";
import { navigateTo } from "../../models/router";

import "./index.css";

export interface RestaurantProps {
  id: number;
}

export const Restaurant: React.FC<RestaurantProps> = ({ id }) => {
  useEffect(() => {
    loadRestaurant(id);
  }, []);

  const loading = useStore(loadRestaurantFx.pending);
  const restaurant = useStore($selectedRestaurant);

  return (
    <SideForm
      title={loading ? "Loading..." : restaurant?.name}
      description={loading ? "" : restaurant?.about}
      onClose={() => navigateTo("/restaraunts")}
    >
      <p>Kek</p>
    </SideForm>
  );
};
