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
    Category:"",
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(TRANSACTION_URL + "/" + id, {
        method: "delete",
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
      <h1>are you sure?
        <p> Amount:{form.amount} </p>
        <p> Concept:{form.concept} </p>
        <p> Date:{form.date} </p>
        <p> Type:{form.type} </p>
        <p> Category:{form.Category.name} </p> 
      </h1>
      <form onSubmit={handleSubmit}>
        <div className=""/>
        <button
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
