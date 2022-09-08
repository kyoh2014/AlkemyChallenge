import React from "react";
import { NavLink } from "react-router-dom";
import Balance from "./Balance";
import RecentList from "./RecentList";

export default function UserHome(token) {

  return (
    <div>
      <h1>Welcome</h1>
      <div className="">
        <Balance token={token} />
        <br />
        <RecentList />
        <br />
        <p>
          <NavLink to="/transaction">
          New Transaction
          </NavLink>
        </p>
        <p>
          <NavLink to="/transaction/list">
            List Transaction
          </NavLink>
        </p>
      </div>
    </div>
  );
}
