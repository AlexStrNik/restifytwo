import React from "react";
import { useStore } from "effector-react";

import { $user } from "../../models/user";

import "./index.css";

export const Account = () => {
  const name = useStore($user.map((user) => user?.name));

  return (
    <div>
      <h1 className="Account-Header">Hello, {name}!</h1>
    </div>
  );
};
