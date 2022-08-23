import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {

  const navigate = useNavigate()
  
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    setToken(null)
    navigate("/")
  };


  return (
    <>
      <nav>
        <NavLink to={token === null ? "/" : "/home"}>MyBudget</NavLink>
        {token === null ? (
          <>
            <NavLink to="/auth">Login</NavLink>
            <NavLink to="/auth/register">Register</NavLink>
          </>
        ) : (
          <NavLink to="/" onClick={handleLogOut}>
            Logout
          </NavLink>
        )}
      </nav>
    </>
  );
}
