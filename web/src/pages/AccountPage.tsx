import {
  Button,
  Center,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  TextInput as TextInput_,
  Title,
} from "@mantine/core";
import { createRouteView } from "atomic-router-react";
import { createEvent, sample } from "effector";
import { useStore } from "effector-react";

import { routes } from "../shared/routes";
import { APIUserUpdate } from "../api/types";
import { createFormStore } from "../models/form";
import { $user, updateAccount, updateAccountFx } from "../models/user";

const accountForm = createFormStore<APIUserUpdate>();
const accountSubmit = createEvent();

const TextInput = accountForm.controlled(TextInput_);

sample({
  clock: $user,
  fn: (user) => user as APIUserUpdate,
  target: accountForm.$store,
});

sample({
  clock: accountSubmit,
  source: accountForm.$store,
  target: updateAccount,
});

const AccountPage = () => {
  const user = useStore($user);
  const loading = useStore(updateAccountFx.pending);

  return (
    <>
      <Stack p="lg" maw={700} pos="relative">
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Title style={{ marginTop: 0 }} order={1}>
          Account settings
        </Title>
        <TextInput name="name" placeholder="User name" label="Name"></TextInput>

        {user?.is_admin && (
          <>
            <TextInput
              name="archilogic_secret_token"
              placeholder="User token"
              label="Archilogic Token (Secret)"
              size="md"
              mt="md"
            ></TextInput>
            <TextInput
              name="archilogic_public_token"
              placeholder="User token"
              label="Archilogic Token (Public)"
              size="md"
              mt="md"
            ></TextInput>
          </>
        )}

        <Button
          className="AccountPage-Submit"
          fullWidth
          mt="xl"
          size="md"
          onClick={() => accountSubmit()}
        >
          Update account
        </Button>
      </Stack>
    </>
  );
};

export const route = routes.account;

export default {
  route,
  view: AccountPage,
};
