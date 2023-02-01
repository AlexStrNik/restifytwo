import React from "react";
import { useStore } from "effector-react";

import { $navbarSelected } from "../../models/navbar";

import { Navbar } from "../../components/Navbar";
import { Account } from "../Account";
import { Restaurants } from "../Restaurants";
import { Reservations } from "../Reservations";

import "./index.css";

export const Dashboard = () => {
  const selectedPage = useStore($navbarSelected);
  let Page = Account;

  switch (selectedPage) {
    case "restaurants":
      Page = Restaurants;
      break;
    case "reservations":
      Page = Reservations;
      break;
    case "account":
    default:
      Page = Account;
      break;
  }

  return (
    <div className="DashboardPage">
      <Navbar />
      <div className="DashboardPage-Content">{React.createElement(Page)}</div>
    </div>
  );
};
