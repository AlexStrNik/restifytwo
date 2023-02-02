import { createEvent } from "effector";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { SideForm } from "../../components/SideForm";

import { createFormStore } from "../../models/form";
import { navigateTo } from "../../models/router";

import "./index.css";

const newRestaurantForm = createFormStore();
const restaurantSubmit = createEvent();

export const NewRestaurant = () => {
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
      <Input
        form={newRestaurantForm}
        name="name"
        placeholder="Some"
        label="About"
      ></Input>
      <Button onClick={restaurantSubmit}>Create restaurant</Button>
    </SideForm>
  );
};
