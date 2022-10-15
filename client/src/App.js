import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ISAUTHENTICATE_URL } from "./configs/api_url"
import ProtectedRoute from "./components/Utils/ProtectedRoute"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home";
import UserHome from "./components/UserHome/UserHome";
import TransactionList from "./components/Transactions/TransactionList";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [buttonRegister, setButtonRegister] = useState(false)
 
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
      }
    }
    fetchData();
  }, [token]);

  return (
  <div className="App">
    <Router>
      <Navbar token={token} setToken={setToken} buttonRegister={buttonRegister} setButtonRegister={setButtonRegister}/>
        <Routes>
          <Route path="/" element={<Home setButtonRegister={setButtonRegister} token={token}/>} />
          <Route path="/home" element={<ProtectedRoute token={token}><UserHome token={token}/></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute token={token}><TransactionList token={token}/></ProtectedRoute>} />
        </Routes>
      <Footer />
    </Router>
  </div>
  );
}

export default App;
