import { createEvent, sample } from "effector";
import { useStore } from "effector-react";
import { APIRestaurantCreate } from "../../api/types";

import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import { SideForm } from "../../components/SideForm";
import { Textarea } from "../../components/Textarea";

import {
  createRestaurant,
  createRestaurantFx,
  loadRestaurantsFx,
} from "../../models/admin";
import { createFormStore } from "../../models/form";
import { navigateTo } from "../../models/router";

import "./index.css";

const newRestaurantForm = createFormStore<APIRestaurantCreate>();
const restaurantSubmit = createEvent();

sample({
  clock: restaurantSubmit,
  source: newRestaurantForm.$store,
  target: createRestaurant,
});

sample({
  clock: createRestaurantFx.done,
  fn: () => "/admin",
  target: navigateTo,
});

export const NewRestaurant = () => {
  const loading = useStore(createRestaurantFx.pending);

  return (
    <SideForm
      title="Create restaurant"
      description="Please enter restaurant details."
      onClose={() => navigateTo("/admin")}
    >
      <Input
        form={newRestaurantForm}
        name="name"
        placeholder="Enter restaurant name"
        label="Name"
      ></Input>
      <Textarea
        form={newRestaurantForm}
        name="about"
        placeholder="Some"
        label="About"
        rows={5}
      ></Textarea>
      <Button
        className="NewRestaurant-Submit"
        disabled={loading}
        onClick={restaurantSubmit}
      >
        {loading && (
          <Icon className="NewRestaurant-Loader" icon="fa-hourglass-half" />
        )}{" "}
        Create restaurant
      </Button>
    </SideForm>
  );
};
