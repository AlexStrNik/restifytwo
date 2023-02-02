import React from "react";
import { useStore } from "effector-react";

import { $route } from "../../models/router";

import { Navbar } from "../../components/Navbar";
import { Account } from "../Account";
import { Restaurants } from "../Restaurants";
import { Reservations } from "../Reservations";
import { Admin } from "../Admin";

import "./index.css";

export const Dashboard = () => {
  const selectedPage = useStore($route);
  let Page = null;

  switch (selectedPage.split("/")[1]) {
    case "restaurants":
      Page = <Restaurants />;
      break;
    case "admin":
      Page = <Admin />;
      break;
    case "reservations":
      Page = <Reservations />;
      break;
    case "account":
    default:
      Page = <Account />;
      break;
  }

  return (
    <div className="DashboardPage">
      <Navbar />
      <div className="DashboardPage-Content">{Page}</div>
    </div>
  );
};
