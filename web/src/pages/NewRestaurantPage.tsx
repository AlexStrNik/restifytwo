import {
  Button,
  LoadingOverlay,
  ScrollArea,
  Select,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { createEvent, sample } from "effector";
import { createForm, useForm } from "effector-forms";
import { chainRoute, redirect } from "atomic-router";
import { useStore } from "effector-react";

import { routes } from "../shared/routes";
import { $user, adminOnly } from "../models/user";
import { createRestaurantFx, uploadRestaurantImagesFx } from "../models/admin";
import { $myFloors, loadFloorsFx } from "../models/archilogic";
import Floorplan from "../components/Floorplan";
import { APIRestaurantCreate, FileWithPath } from "../api/types";
import ImageInput from "../components/ImageInput";

type FormFields = Omit<APIRestaurantCreate, "floor_id"> & {
  floor_id: string | null;
  images: FileWithPath[];
};

const restaurantForm = createForm<FormFields>({
  fields: {
    name: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value: string) => Boolean(value),
        },
      ],
    },
    floor_id: {
      init: null,
      rules: [
        {
          name: "required",
          validator: (value: string | null) => Boolean(value),
        },
      ],
    },
    images: {
      init: [],
    },
    about: {
      init: "",
    },
  },
  validateOn: ["change"],
});

const restaurantSubmit = createEvent();

sample({
  clock: restaurantSubmit,
  source: restaurantForm.$values,
  fn: (s) => s as APIRestaurantCreate,
  target: createRestaurantFx,
});

sample({
  clock: createRestaurantFx.doneData,
  source: restaurantForm.fields.images.$value,
  fn: (images, restaurant) => ({ restaurant, images }),
  target: uploadRestaurantImagesFx,
});

sample({
  clock: uploadRestaurantImagesFx.doneData,
  target: restaurantForm.reset,
});

redirect({
  clock: uploadRestaurantImagesFx.doneData,
  route: routes.admin,
});

export const NewRestaurantPage = () => {
  const user = useStore($user);
  const floors = useStore($myFloors);
  const loading = useStore(createRestaurantFx.pending);
  const { fields, eachValid } = useForm(restaurantForm);

  return (
    <ScrollArea p="lg" maw={700}>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Title order={1}>New restaurant</Title>
      <TextInput
        name="name"
        placeholder="Restaurant name"
        label="Name"
        value={fields.name.value}
        onChange={(e) => fields.name.onChange(e.target.value)}
        error={fields.name.errorText({
          required: "name required",
        })}
      />
      <ImageInput
        value={fields.images.value}
        label={"Restaurant images"}
        onChange={fields.images.onChange}
      />
      <Select
        name="floorplan"
        label="Restaurant floorplan"
        placeholder="Pick floorplan"
        value={fields.floor_id.value}
        onChange={fields.floor_id.onChange}
        error={fields.name.errorText({
          required: "floorplan required",
        })}
        data={floors.map((floor) => ({
          label: floor.name,
          value: floor.id,
        }))}
      />
      {fields.floor_id.value && (
        <div style={{ pointerEvents: "none" }}>
          <Floorplan
            publishableToken={user!.archilogic_public_token}
            floorId={fields.floor_id.value}
          />
        </div>
      )}
      <Textarea
        autosize
        name="about"
        placeholder="Restaurant description"
        label="Description"
        value={fields.about.value}
        onChange={(e) => fields.about.onChange(e.target.value)}
      />

      <Button
        fullWidth
        mt="xl"
        size="md"
        onClick={() => restaurantSubmit()}
        disabled={!eachValid}
      >
        Create Restaurant
      </Button>
    </ScrollArea>
  );
};

const route = chainRoute({
  route: adminOnly(routes.restaurants.new),
  beforeOpen: {
    effect: loadFloorsFx,
    mapParams: () => null,
  },
});

export default {
  route,
  view: NewRestaurantPage,
};
