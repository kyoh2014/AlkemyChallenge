import "./Register.css"
import React, { useState } from "react";
import { REGISTER_URL } from "../../configs/api_url";

export default function Register({setButtonLogin, setButtonRegister}) {
  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)[A-Za-z0-9\d$@$!%*?&]{8,15}$/);
  const emailRegex = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
  const [alertRegister, setAlertRegister] = useState(false)
  const [alertEmail, setAlertEmail] = useState(false)
  const [alertPassword, setAlertPassword] = useState(false)
  const [incompleteName, setIncompleteName] = useState(false)
  const [incompleteLastname, setIncompleteLastname] = useState(false)
  const [incompleteUsername, setIncompleteUsername] = useState(false)
  const [incompleteEmail, setIncompleteEmail] = useState(false)
  const [incompletePassword, setIncompletePassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    password: "",
    username: "",
    email: "",
  });

  const handleClose = (e) => {
    setAlertRegister(false)
  };

  const handleChange = (e) => {
    setIncompleteName(false)
    setIncompleteLastname(false)
    setIncompleteUsername(false)
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
    if (form.name === ""){
      setIncompleteName(true)
    } 
    if (form.lastname === "") {
      setIncompleteLastname(true)
    } 
    if (form.username === "") {
      setIncompleteUsername(true)
    } 
    if (form.email === "") {
      setIncompleteEmail(true)
    } 
    if (form.password === "") {
      setIncompletePassword(true)
    } 
    try {
      const response = await fetch(REGISTER_URL, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify(form)
      
      })
      if(response.status === 201) {
        setButtonRegister(false)
        alert("You have successfully registered")
        setButtonLogin(true)
      } else {
        setAlertRegister(true)
      }
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="register_main">
      <div className="register_title">
      <h1>Register</h1>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="register_name">
          <label>Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        {incompleteName &&(
          <div>
            <p className="alert">Please enter a name.</p>
          </div>
        )}
        <div className="register_lastname">
          <label>Lastname: </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={handleChange}
          />
        </div>
        {incompleteLastname &&(
          <div>
            <p className="alert">Please enter a lastname.</p>
          </div>
        )}
        <div className="register_username">
          <label>Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        {incompleteUsername &&(
          <div>
            <p className="alert">Please enter a username.</p>
          </div>
        )}
        <div className="register_email">
          <label>E-mail: </label>
          <input
            type="email"
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
            <p className="alert">Please enter a email adress.</p>
          </div>
        )}
        <div className="register_password">
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
          Register
        </button>
        {alertRegister && (
          <div className="overlay_alert">
            <div className="popup_alert">
            <button className="button_close" onClick={handleClose}>x</button>
              <p className="alert_description"> Fill out the form correctly. </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
