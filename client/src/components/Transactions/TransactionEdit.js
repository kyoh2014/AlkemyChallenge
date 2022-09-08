import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TRANSACTION_URL } from "../../configs/api_url";


export default function Transaction({token}) {

  const {id} = useParams()
  const navigate = useNavigate();
  const [form, setForm] = useState({
    concept: "",
    amount: 0,
    date: "",
    type: "",
    idCategory: "",
    Categorry:"",
  });


  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(TRANSACTION_URL + "/" + id, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${token}`,
            },
          });
          const data = await response.json();
  
          if (response.status === 200) {
            setForm(data.data);
          } 
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }, [token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(TRANSACTION_URL + "/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${token}`,
        },
        body: JSON.stringify(form)
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
      <h1>Transaction Edit</h1>
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
            <span className="">:{form.type}</span>
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
