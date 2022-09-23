import "./App.css"
import { BrowserRouter as Router, Route, Routes, redirecTo } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ISAUTHENTICATE_URL } from "./configs/api_url"

import ProtectedRoute from "./components/Utils/ProtectedRoute"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import UserHome from "./components/UserHome/UserHome";
import Transaction from "./components/Transactions/Transaction";
import TransactionList from "./components/Transactions/TransactionList";
import TransactionEdit from "./components/Transactions/TransactionEdit";
import TransactionDelete from "./components/Transactions/TransactionDelete";




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
}, [token]);

  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home token={token}/>} />

          <Route path="/auth/register" element={<Register />} />

          <Route path="/auth" element={<Login setToken={setToken}/>} />

          <Route path="/home" element={<ProtectedRoute token={token}><UserHome token={token}/></ProtectedRoute>} />

          <Route path="/transaction" element={<ProtectedRoute token={token}><Transaction token={token}/></ProtectedRoute>} />

          <Route path="/transaction/list" element={<ProtectedRoute token={token}><TransactionList token={token}/></ProtectedRoute>} />

          <Route path="/transaction/edit/:id" element={<ProtectedRoute token={token}><TransactionEdit token={token}/></ProtectedRoute>} />
          
          <Route path="/transaction/delete/:id" element={<ProtectedRoute token={token}><TransactionDelete token={token}/></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
