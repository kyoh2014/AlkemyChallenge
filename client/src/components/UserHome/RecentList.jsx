import "./RecentList.css";
import React, { useEffect, useState } from "react";
import { RECENTLIST_URL } from "../../configs/api_url";
import OperationItem from "../Utils/OperationItem";

export default function RecentList({ token }) {
  const [recentList, setRecentList] = useState(undefined);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(RECENTLIST_URL, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (response.status === 200) {
          setRecentList(data.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchBalance();
  }, [token]);

  return (
    <div className="recentlist_main">
      <div className="recentlist_title">
        <h1>The 10 most recent transactions</h1>
      </div>
      <div className="recentlist_container">
        {recentList &&
          (recentList.length === 0 ? (
            <div className="recentlist_container_empty">
              <h1>Your transactions will be here.</h1>
            </div>
          ) : (
            recentList?.map((transaction) => (
              <OperationItem
                token={token}
                key={transaction.id}
                id={transaction.id}
                amount={transaction.amount}
                concept={transaction.concept}
                date={transaction.date}
                type={transaction.type}
                category={transaction.Category.name}
              />
            ))
          ))}
      </div>
    </div>
  );
}
