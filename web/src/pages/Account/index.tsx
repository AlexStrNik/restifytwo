import { createEvent, sample } from "effector";
import { useStore } from "effector-react";
import { APIUserUpdate } from "../../api/types";

import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";

import { createFormStore } from "../../models/form";
import { $user, updateAccount, updateAccountFx } from "../../models/user";

import "./index.css";

const accountForm = createFormStore<APIUserUpdate>();
const accountSubmit = createEvent();

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

export const Account = () => {
  const user = useStore($user);
  const loading = useStore(updateAccountFx.pending);

  return (
    <div className="AccountPage">
      <h1 className="AccountPage-Header">Hello, {user?.name}!</h1>
      <Input
        form={accountForm}
        name="name"
        placeholder="User name"
        label="Name"
      ></Input>

      {user?.is_admin && (
        <Input
          form={accountForm}
          name="archilogic_token"
          placeholder="User token"
          label="Archilogic Token"
        ></Input>
      )}
      <Button
        className="AccountPage-Submit"
        disabled={loading}
        onClick={accountSubmit}
      >
        {loading && (
          <Icon className="NewRestaurant-Loader" icon="fa-hourglass-half" />
        )}{" "}
        Update account
      </Button>
    </div>
  );
};
