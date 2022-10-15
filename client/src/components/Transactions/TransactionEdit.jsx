import "./TransactionEdit.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TRANSACTION_URL, CATEGORIES_URL } from "../../configs/api_url";

export default function Transaction({ token, elementId }) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [idListCategory, setIdListCategory] = useState(undefined);
  const [listCategory, setListCategory] = useState([]);
  const [alertTransactionEdit, setAlertTransactionEdit] = useState(false)
  const [incompleteAmount, setIncompleteAmount] = useState(false)
  const [incompleteDate, setIncompleteDate] = useState(false)
  const [incompleteConcept, setIncompleteConcept] = useState(false)
  const [incompleteCategory, setIncompleteCategory] = useState(false)
  const [alertAmount, setAlertAmount] = useState(false)
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
        id = elementId
      }
      try {
        const transactionResponse = await fetch(TRANSACTION_URL + "/" + id, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
          },
        });
        const transactionType = await transactionResponse.json();

        const categoryResponse = await fetch(CATEGORIES_URL, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
          },
        });
        const categoryData = await categoryResponse.json();

        if (transactionResponse.status === 200) {
          console.log(transactionType.data.type)
          setForm({
            ...form,
            type: transactionType.data.type,
          })
        }
        if (categoryResponse.status === 200) {
          setListCategory(categoryData.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [token, id]);

  const handleChange = (e) => {
    setIncompleteAmount(false)
    setIncompleteDate(false)
    setIncompleteConcept(false)
    setIncompleteCategory(false)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    if ([e.target.name] == "amount"){
      if(!(parseInt(e.target.value) >= 1) || !(e.target.value.length < 16)){
        setAlertAmount(true)
      } else {
        setAlertAmount(false)
      }
    }
  };

  const handleChangeCategory = (e) => {
    setIncompleteAmount(false)
    setIncompleteDate(false)
    setIncompleteConcept(false)
    setIncompleteCategory(false)
    setIdListCategory({
      ...idListCategory,
      [e.target.name]: e.target.value,
    });
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    if (elementId) {
      id = elementId;
    }
    if (form.amount === "" || form.amount === 0){
      setIncompleteAmount(true)
    } 
    if (form.concept === "") {
      setIncompleteConcept(true)
    } 
    if (form.date === "") {
      setIncompleteDate(true)
    } 
    if (form.idCategory === "") {
      setIncompleteCategory(true)
    } 
    try {
      const response = await fetch(TRANSACTION_URL + "/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.status === 200) {
        navigate("/");
      } else {
        setAlertTransactionEdit(true)
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = (e) => {
    setAlertTransactionEdit(false)
  }
  return (
    <div className="transaction_main">
      <div className="transaction_title">
        <h1>Transaction Edit</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="transaction_concept">
          <label>Concept: </label>
          <select
            type="text"
            id="concept"
            name="concept"
            onChange={handleChange}
          >
            <option value="" selected disabled >Select Concept Of Transaction</option>
            <option value="Rental">Rental</option>
            <option value="Installments">Installments</option>
            <option value="Expenses">Expenses</option>
            <option value="Invoice">Invoice</option>
            <option value="Loans">Loans</option>
            <option value="Several">Several</option>
          </select>
        </div>
        {incompleteConcept &&(
          <div>
            <p className="alert">Please enter a concept.</p>
          </div>
        )}
        <div className="transaction_category">
          <label>Category: </label>
          <select
            type="text"
            id="idCategory"
            name="idCategory"
            onChange={handleChangeCategory}
          >
            <option value="" selected disabled >Select Category Of Transaction</option>
            {listCategory?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {incompleteCategory &&(
          <div>
            <p className="alert">Please enter a category.</p>
          </div>
        )}
        <div className="transaction_amount">
          <label>Amount: </label>
          <input
            type="real"
            id="amount"
            name="amount"
            onChange={handleChange}
          />
          {alertAmount &&(
          <div>
            <p className="alert">Enter a value greater than 0 and less than 16 digits.</p>
          </div>
          )}
        </div>
        {incompleteAmount &&(
            <div>
              <p className="alert">Please enter a value.</p>
            </div>
        )}
        <div className="transactionedit_type">
          <label>Type: </label>
            <span>{form.type}</span>   
        </div>
        <div className="transaction_date">
          <label>Date: </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            onChange={handleChange}
          />
        </div>
        {incompleteDate &&(
          <div>
            <p className="alert">Please enter a date.</p>
          </div>
        )}
        <button className="button_submit" type="submit">
          Submit
        </button>
        {alertTransactionEdit &&(
          <div className="overlay_alert">
            <div className="popup_alert">
              <button className="button_close" onClick={handleClose}>x</button>
              <p className="alert_description"> Fill out the form correctly. </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
