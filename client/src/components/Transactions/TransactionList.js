import React, { useEffect, useState } from "react";
import { ALLRECENTLIST_URL,
  CATEGORIES_URL } from "../../configs/api_url";
import OperationItem from "../Utils/OperationItem";

export default function RecentList({ token }) {
  const [type, setType] = useState(undefined);
  const [idCategory, setIdCategory] = useState(undefined);
  const [listCategory, setListCategory] = useState([])
  const [transactionList, setTransactionList] = useState([]);

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
      console.log(type.type)
      console.log(idCategory)

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
    <div>
      <h1>Your Transactions</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>Type</label>
          <select type="text" id="type" name="type" onChange={handleChangeType}>
            <option value="">Select Type Of Transaction</option>
            <option value="income">Income</option>
            <option value="egress">Egress</option>
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
        <option value={category.id} key={category.id}> {category.name}</option>
      ))}
          </select>
        </div>
        <button type="submit">Select</button>
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
