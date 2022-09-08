import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TRANSACTION_URL } from "../../configs/api_url";

export default function Transaction({token}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    concept: "",
    amount: 0,
    date: "",
    type: "",
    idUser: "",
    idCategory: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(TRANSACTION_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>Concept</label>
          <select
            type="text"
            id="concept"
            name="concept"
            onChange={handleChange}
            >
            <option value="">Select Concept Of Transaction</option>
            <option value="Rental">Rental</option>
            <option value="Installments">Installments</option>
            <option value="Expenses">Expenses</option>
            <option value="Invoice">Invoice</option>
            <option value="Loans">Loans</option>
            <option value="Several">Several</option>
          </select>
        </div>
        <div className="">
          <label>Category</label>
          <select
            type="text"
            id="idCategory"
            name="idCategory"
            onChange={handleChange}
            >
            <option value="">Select Category Of Transaction</option>
            <option value="4">Shopping</option>
            <option value="5">Entertainment</option>
            <option value="6">Restaurants and Bars</option>
            <option value="7">Health and Sport</option>
            <option value="8">Services</option>
            <option value="9">Supermarket</option>
            <option value="10">Transportation</option>
            <option value="11">Holidays</option>
          </select>
        </div>
        <div className="">
            <label>Amount</label>
            <input
            type="real"
            id="amount"
            name="amount"
            onChange={handleChange}
            />
        </div>
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
        <div className="">
          <label>Date</label>
          <input
          type="datetime-local"
          id="date"
          name="date"
          onChange={handleChange}
          />
        </div>
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
