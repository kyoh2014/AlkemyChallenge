import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Home({token}) {

  const navigate = useNavigate()

  useEffect(()=>{
    if(token){
      navigate("/home")
    }
  })

  return (
    <div>
      <h1>MyBudget</h1>
      <p>
        Keep track of your expenses and your income. Get Started!
        <Link to="/auth/register">
            Start
        </Link>
      </p>
    </div>
  )
}
