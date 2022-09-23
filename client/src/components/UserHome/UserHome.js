import React, { useEffect }from "react";
import { Link, useNavigate } from "react-router-dom";
import Balance from "./Balance";
import RecentList from "./RecentList";

export default function UserHome({token}) {

  return (
    <div>
      <h1>Welcome</h1>
      <div className="">
        <Balance token={token} />
        <br />
        <RecentList token={token}/>
        <br />
        <p>
          <Link to="/transaction">
          New Transaction
          </Link>
        </p>
        <p>
          <Link to="/transaction/list">
            List Transaction
          </Link>
        </p>
      </div>
    </div>
  );
}
