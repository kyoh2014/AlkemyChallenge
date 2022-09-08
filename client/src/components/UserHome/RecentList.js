import React, { useEffect, useState } from "react";
import { RECENTLIST_URL } from "../../configs/api_url";
import OperationItem from "../Utils/OperationItem";

export default function RecentList({}) {
  const [recentList, setRecentList] = useState(undefined);
  const [token, setToken] = useState(localStorage.getItem("token"));

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
        } else {
          setToken(null);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchBalance();
  }, [token]);

  return (
    <div>
      <h1>Your 10 most recent transactions</h1>
      {recentList?.map((transaction) => (
          <OperationItem
            key={transaction.id}
            id={transaction.id}
            amount={transaction.amount}
            concept={transaction.concept}
            date={transaction.date}
            type={transaction.type}
            category={transaction.Category.name}
          />
      ))}
    </div>
  );
}
