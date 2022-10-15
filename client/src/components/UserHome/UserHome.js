import "./UserHome.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Balance from "./Balance";
import RecentList from "./RecentList";
import Transaction from "../Transactions/Transaction";

export default function UserHome({ token }) {
  const [buttonTransaction, setButtonTransaction] = useState(false);

  const handleNewTransaction = (e) => {
    setButtonTransaction(true);
  };
  const handleClose = (e) => {
    setButtonTransaction(false);
  };

  return (
    <div className="userhome_main">
      <div className="userhome_form">
        <div className="userhome_balance">
          <Balance token={token} />
        </div>
        <div className="userhome_buttons">
          <div className="userhome_button_margin">
            <button className="button" onClick={handleNewTransaction}>
              New Transaction
            </button>
            {buttonTransaction && (
            <div className="overlay">
              <div className="popup">
                <button className="button_close" onClick={handleClose}>x</button>
                <Transaction
                  setButtonTransaction={setButtonTransaction}
                  token={token}
                />
              </div>
            </div>
            )}
          </div>
          <div className="userhome_button_margin">
            <Link to="/transactions">
              <button className="button">View all Transaction</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="userhome_recentlist">
        <RecentList token={token} />
      </div>
    </div>
  );
}
