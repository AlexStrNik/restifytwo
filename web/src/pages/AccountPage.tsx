import { Button, LoadingOverlay, Stack, TextInput, Title } from "@mantine/core";
import { createForm, useForm } from "effector-forms";
import { createEvent, sample } from "effector";
import { useStore } from "effector-react";

import { routes } from "../shared/routes";
import { APIUserUpdate } from "../api/types";
import { $user, updateAccount, updateAccountFx } from "../models/user";
import { useEffect } from "react";

const accountForm = createForm({
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
    archilogic_secret_token: {
      init: "",
      rules: [
        {
          name: "required",
          source: $user,
          validator: (value: string, _form, user) =>
            Boolean(value) || !user.is_admin,
        },
      ],
    },
    archilogic_public_token: {
      init: "",
      rules: [
        {
          name: "required",
          source: $user,
          validator: (value: string, _form, user) =>
            Boolean(value) || !user.is_admin,
        },
      ],
    },
  },
  validateOn: ["change"],
});
const accountSubmit = createEvent();

sample({
  clock: $user,
  fn: (user) => user as APIUserUpdate,
  target: accountForm.set,
});

sample({
  clock: accountSubmit,
  source: accountForm.$values,
  target: updateAccount,
});

const AccountPage = () => {
  const user = useStore($user);
  const loading = useStore(updateAccountFx.pending);
  const { fields, eachValid } = useForm(accountForm);

  return (
    <Stack p="lg" maw={700}>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Title order={1}>Account settings</Title>
      <TextInput
        name="name"
        placeholder="User name"
        label="Name"
        value={fields.name.value}
        onChange={(e) => fields.name.onChange(e.target.value)}
        error={fields.name.errorText({
          required: "name required",
        })}
      ></TextInput>

      {user?.is_admin && (
        <>
          <TextInput
            name="archilogic_secret_token"
            placeholder="User token"
            label="Archilogic Token (Secret)"
            size="md"
            mt="md"
            value={fields.archilogic_secret_token.value}
            onChange={(e) =>
              fields.archilogic_secret_token.onChange(e.target.value)
            }
            error={fields.archilogic_secret_token.errorText({
              required: "field required",
            })}
          ></TextInput>
          <TextInput
            name="archilogic_public_token"
            placeholder="User token"
            label="Archilogic Token (Public)"
            size="md"
            mt="md"
            value={fields.archilogic_public_token.value}
            onChange={(e) =>
              fields.archilogic_public_token.onChange(e.target.value)
            }
            error={fields.archilogic_public_token.errorText({
              required: "field required",
            })}
          ></TextInput>
        </>
      )}

      <Button
        className="AccountPage-Submit"
        fullWidth
        mt="xl"
        size="md"
        onClick={() => accountSubmit()}
        disabled={!eachValid}
      >
        Update account
      </Button>
    </Stack>
  );
};

export const route = routes.account;

export default {
  route,
  view: AccountPage,
};
