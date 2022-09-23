import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TRANSACTION_URL,
  CATEGORIES_URL } from "../../configs/api_url";


export default function Transaction({token}) {

  const {id} = useParams()
  const navigate = useNavigate();
  const [idListCategory, setIdListCategory] = useState(undefined);
  const [listCategory, setListCategory] = useState([])
  const [form, setForm] = useState({
    concept: "",
    amount: 0,
    date: "",
    type: "",
    idCategory: "",
  });


  useEffect(() => {
    const fetchData = async () => {
        try {
          const transactionResponse = await fetch(TRANSACTION_URL + "/" + id, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${token}`,
            },
          });
          const transactionData = await transactionResponse.json();

          const categoryResponse = await fetch(CATEGORIES_URL, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${token}`,
            },
          });
          const categoryData = await categoryResponse.json();
  
          if (transactionResponse.status === 200) {
            setForm(transactionData.data)
          }
          if (categoryResponse.status === 200) {
            setListCategory(categoryData.data)
          } 
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }, [token, id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    };
  

  const handleChangeCategory = (e) => {
      setIdListCategory({
        ...idListCategory,
        [e.target.name]: e.target.value,
      })
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
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
            onChange={handleChangeCategory}
            >
            <option value="">Select Category Of Transaction</option>
            {listCategory?.map((category) => (
        <option value={category.id} key={category.id}>{category.name}</option>
      ))}
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
