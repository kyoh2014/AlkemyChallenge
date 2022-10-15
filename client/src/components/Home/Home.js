import "./Home.css"
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({token, setButtonRegister}) {

  const navigate = useNavigate()

  useEffect(()=>{
    if(token){
      navigate("/home")
    }
  })

  const handleButton = (e) =>{
    setButtonRegister(true)
  }

  return (
    <div className="home_main">
      <div className="home_title">
        <h1>Keep track of your expenses and your income. Get Started!</h1>
      </div>
      <div className="home_description">
      <p className="home_description_margin">
        Record your money movements and check the total balance.
      </p>
      <p className="home_description_margin">
        You will be able to keep track of the expenses and income you make and have them well categorized.
      </p>
      </div>
      <div className="home_start">
          <button className="button" onClick={handleButton}>
            Get Started
          </button>
      </div>      
    </div>
  )
}
