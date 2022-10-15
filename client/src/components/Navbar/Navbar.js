import "./Navbar.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

export default function Navbar({ token, setToken, buttonRegister, setButtonRegister,}){
  const [buttonLogin, setButtonLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const handleRegister = (e) => {
    setButtonRegister(true);
  };
  const handleLogin = (e) => {
    setButtonLogin(true);
  };
  const handleClose = (e) => {
    setButtonLogin(false);
    setButtonRegister(false);
  };

  return (
    <div className="navbar_main">
      <nav>
        <NavLink to={token === null ? "/" : "/home"}>
          <button className="navbar_home">
            {" "}MyBudget{" "}
          </button>
        </NavLink>
        {token === null ? (
          <div className="navbar_auth">
            <div className="navbar_auth_margin">
              <button className="button" onClick={handleLogin}>
                Login
              </button>
              {buttonLogin && (
                <div className="overlay">
                  <div className="popup">
                    <button className="button_close" onClick={handleClose}>
                      x
                    </button>
                    <Login
                      setButtonLogin={setButtonLogin}
                      setToken={setToken}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="navbar_auth_margin">
              <button className="button" onClick={handleRegister}>
                Register
              </button>
              {buttonRegister && (
                <div className="overlay">
                  <div className="popup">
                    <button className="button_close" onClick={handleClose}>
                      x
                    </button>
                    <Register
                      setButtonRegister={setButtonRegister}
                      setButtonLogin={setButtonLogin}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="navbar_auth">
            <div className="navbar_auth_margin">
              <NavLink to={token === null ? "/" : "/home"}>
                <button className="button">
                  Home
                </button>
              </NavLink>
            </div>
            <div className="navbar_auth_margin">
              <NavLink to="/" onClick={handleLogOut}>
                <button className="button">Logout</button>
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
