import { createEvent, sample } from "effector";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { APIRestaurantCreate } from "../../api/types";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { SideForm } from "../../components/SideForm";
import { Textarea } from "../../components/Textarea";

import { createRestaurant, createRestaurantFx } from "../../models/admin";
import { $myFloors, loadFloors } from "../../models/archilogic";
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

sample({
  clock: createRestaurantFx.done,
  target: newRestaurantForm.clear,
});

export const NewRestaurant = () => {
  useEffect(() => {
    loadFloors();
  }, []);

  const loading = useStore(createRestaurantFx.pending);
  const floors = useStore($myFloors);

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
      <Select
        form={newRestaurantForm}
        name="floor_id"
        placeholder="Select floor plan"
        label="Floor plan"
        options={floors.map((f) => ({
          label: f.name,
          value: f.id,
        }))}
      ></Select>
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
        loading={loading}
      >
        Create restaurant
      </Button>
    </SideForm>
  );
};
