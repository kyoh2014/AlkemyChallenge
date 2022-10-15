import "./TransactionList.css"
import React, { useEffect, useState } from "react";
import { ALLRECENTLIST_URL,
  CATEGORIES_URL } from "../../configs/api_url";
import OperationItem from "../Utils/OperationItem";

export default function RecentList({ token }) {
  const [listCategory, setListCategory] = useState([])
  const [transactionList, setTransactionList] = useState([]);
  const [type, setType] = useState({
    type: "",
  });
  const [idCategory, setIdCategory] = useState({
    idCategory: "",
  });

  useEffect(() => {
    const fetchList = async () => {
        try {
          const response = await fetch(CATEGORIES_URL, {
            method: "get",
          });
          const data = await response.json();
  
          if (response.status === 200) {
            setListCategory(data.data);
          } 
        } catch (e) {
          console.error(e);
        }
      };
      fetchList();
    }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${ALLRECENTLIST_URL}${generateQuery(type.type, idCategory.idCategory)}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setTransactionList(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeType = (e) => {
    setType({
      ...type,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCategory = (e) => {
    setIdCategory({
      ...idCategory,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="transactionlist_main">
      <div className="transactionlist_title">
        <h1>All your Transactions</h1>
      </div>
      <form onSubmit={handleSubmit}>
       <div className="transactionlist_select">
        <div className="transactionlist_type">
          <label>Type: </label>
          <select type="text" id="type" name="type" onChange={handleChangeType}>
            <option value="" disabled>Select Type Of Transaction</option>
            <option value="">All Transactions</option>
            <option value="income">Income</option>
            <option value="egress">Egress</option>
          </select>
        </div>
        <div className="transactionlist_category">
        <label>Category: </label>
        <select
            type="text"
            id="idCategory"
            name="idCategory"
            onChange={handleChangeCategory}
            >
            <option value="" disabled>Select Category Of Transaction</option>
            <option value="">All Transactions</option>
            {listCategory?.map((category) => (
              <option value={category.id} key={category.id}> {category.name}</option>
            ))}
          </select>
          </div>
        <button className="button" type="submit">Select</button>
        </div>
        </form>
        <div className="transactionlist_container">
        {transactionList && (transactionList.length === 0 ? (
          <div className="transactionlist_container_empty">
            <h1>The transaction log will be displayed here.</h1>
          </div>
          ) : (
            transactionList?.map((transactionList) => (
              <div className="transactionlist_form">
                <OperationItem
                  token={token}
                  key={transactionList.id}
                  id={transactionList.id}
                  amount={transactionList.amount}
                  concept={transactionList.concept}
                  date={transactionList.date}
                  type={transactionList.type}
                  category={transactionList.Category.name}
                />
              </div>
          ))))}
      </div>
    </div>
  );
}

function generateQuery(type, category) {
  let flag = false;
  let query = "";

  if (type) {
    query += "type=" + type;
    query += '&'
    flag = true;
  } 
  if (category) {
    query += "idCategory=" + category;
    query += '&'
    flag = true;
  } 
  if(!flag) return query;

  return "?" + query.slice(0, -1)
}
