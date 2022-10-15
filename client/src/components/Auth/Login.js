import "./Login.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../configs/api_url";

export default function Login({setToken, setButtonLogin}) {
  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)[A-Za-z0-9\d$@$!%*?&]{8,15}$/);
  const emailRegex = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
  const [alertEmail, setAlertEmail] = useState(false)
  const [alertPassword, setAlertPassword] = useState(false)
  const [incompleteEmail, setIncompleteEmail] = useState(false)
  const [incompletePassword, setIncompletePassword] = useState(false)
  const [alertLogin, setAlertLogin] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();

  const handleClose = (e) => {
    setAlertLogin(false);
  };

  const handleChange = (e) => {
    setIncompleteEmail(false)
    setIncompletePassword(false)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    if ([e.target.name] == "email"){
      if (!emailRegex.test(e.target.value)){
        setAlertEmail(true)
      } else {
        setAlertEmail(false)
      }
    }

    if ([e.target.name] == "password"){
      if (!passwordRegex.test(e.target.value)){
        setAlertPassword(true)
      } else {
        setAlertPassword(false)
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form)
    if (form.email === ""){
      setIncompleteEmail(true)
    } 
    if (form.password === "") {
      setIncompletePassword(true)
    } 
    try {
      const response = await fetch(LOGIN_URL, {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if(response.status === 200) {
        const data = await (response.json())
        localStorage.setItem("token", data.token)
        setToken(data.token)
        setButtonLogin(false)
        navigate("/home") 
      } else {
        setAlertLogin(true)
      }
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="login_main">
      <div className="login_title">
      <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login_email">
          <label>E-mail: </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
          />
          {alertEmail && (
          <div className="register_alert">
            <p> The email address must be valid. </p>
          </div>
          )}
        </div>
        {incompleteEmail &&(
          <div>
            <p className="alert">Please enter a email.</p>
          </div>
        )}
        <div className="login_password">
          <label>Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
          {alertPassword && (
            <div className="register_alert">
              <p> The password must be between 8 and 15 characters long, with a combination of uppercase and lowercase letters and numbers. </p>
            </div>
          )}
        </div>
        {incompletePassword &&(
          <div>
            <p className="alert">Please enter a password.</p>
          </div>
        )}
        <button className="button_submit" type="submit">
          Login
        </button>
        {alertLogin && (
          <div className="overlay_alert">
            <div className="popup_alert">
            <button className="button_close" onClick={handleClose}>x</button>
              <p className="alert_description"> Verify that the Email and password are correct. </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}