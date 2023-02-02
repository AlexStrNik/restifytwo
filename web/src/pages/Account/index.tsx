import { useStore } from "effector-react";

import { $user } from "../../models/user";

import "./index.css";

export const Account = () => {
  const user = useStore($user);

  return (
    <div className="AccountPage">
      <h1 className="AccountPage-Header">Hello, {user?.name}!</h1>
    </div>
  );
};
