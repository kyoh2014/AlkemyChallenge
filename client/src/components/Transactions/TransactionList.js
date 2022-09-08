import React, { useState } from "react";
import { ALLRECENTLIST_URL } from "../../configs/api_url";
import OperationItem from "../Utils/OperationItem";

export default function RecentList({token}) {
  const [type, setType] = useState(undefined)
  const [transactionList, setTransactionList] = useState([]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
        const response = await fetch(`${ALLRECENTLIST_URL}${type ? "?type=" + type.type : ""}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          setTransactionList(data.data);
        } 
      } catch (e) {
        console.error(e);
      }
    };

    const handleChange = (e) => {
        setType({
          ...type,
          [e.target.name]: e.target.value,
        });
      };

  return (
    <div>
      <h1>Your Transactions</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>Type</label>
          <select
            type="text"
            id="type"
            name="type"
            onChange={handleChange}
            >
            <option value="">Select Type Of Transaction</option>
            <option value="Income">Income</option>
            <option value="Egress">Egress</option>
          </select>
        </div>
        <button
          type="submit"
        >
          Select
        </button>
      </form>
      {transactionList?.map((transaction) => (
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
