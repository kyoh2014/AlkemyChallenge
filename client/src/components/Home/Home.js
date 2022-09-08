import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";


export default function Home({token}) {

  const navigate = useNavigate()

  useEffect(()=>{
    console.log(token)
    if(token){
      navigate("/home")
    }
  })

  return (
    <div>
      <h1>MyBudget</h1>
      <p>
        Keep track of your expenses and your income. Get Started!
        <NavLink to="/auth/register">
            Start
        </NavLink>
      </p>
    </div>
  )
}
