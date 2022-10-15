import "./TransactionDelete.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TRANSACTION_URL } from "../../configs/api_url";
import dateReformat from "../Utils/DateReformat"

export default function Transaction({ token, elementId, setButtonDelete}) {
  let { id } = useParams();
  const [form, setForm] = useState({
    concept: "",
    amount: 0,
    date: "",
    type: "",
    idCategory: "",
    Category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (elementId) {
        id = elementId;
      }

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
  }, [token, id]);

  const handleSubmit = async (e) => {
    if (elementId) {
      id = elementId;
    }
    try {
      const response = await fetch(TRANSACTION_URL + "/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (response.status === 200) {
        setButtonDelete(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="transactiondelete_main">
      <div className="transactiondelete_form">
        <p className="transactiondelete_title">Are you sure?</p>
        <p className="transactiondelete_font"> Amount: {form.amount} </p>
        <p className="transactiondelete_font"> Concept: {form.concept} </p>
        <p className="transactiondelete_font"> Date: {dateReformat(form.date)} </p>
        <p className="transactiondelete_font"> Type: {form.type} </p>
        <p className="transactiondelete_font"> Category: {form.Category.name} </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div/>
        <button className="transactiondelete_delete" type="submit">Delete</button>
      </form>
    </div>
  );
}
