import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ISAUTHENTICATE_URL } from "./configs/api_url"

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import UserHome from "./components/UserHome/UserHome";
import Balance from "./components/UserHome/Balance";
import TransactionList from "./components/Transactions/TransactionList";
import Transaction from "./components/Transactions/Transaction";
import TransactionEdit from "./components/Transactions/TransactionEdit";
import axios from "axios";



function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
  const fetchData = async() =>{
    try {
      const response = await fetch(ISAUTHENTICATE_URL, {
      method: "get",
      headers: {
        'Content-Type': 'application/json', 
        'authorization': `bearer ${token}`
      }
    })
    if(response.status !== 200) {
      setToken(null);
    }
  } catch (e) {
    console.error(e)
  }}
  fetchData();
}, []);

  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/auth/register" element={<Register />} />

          <Route path="/auth" element={<Login setToken={setToken}/>} />

          <Route path="/home" element={<UserHome />} />

          <Route path="/balance" element={<Balance />} />

          <Route path="/transaction" element={<Transaction />} />

          <Route path="/transaction/edit" element={<TransactionEdit />} />

          <Route path="/transaction/edit/:id" element={<TransactionEdit />} />

          <Route path="/transaction/list" element={<TransactionList />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
