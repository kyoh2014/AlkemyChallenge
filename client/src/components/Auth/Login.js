import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../configs/api_url";

export default function Login({setToken}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(LOGIN_URL, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
      
    })
    if(response.status === 200) {
     const data = await (response.json())
    localStorage.setItem("token", data.token)
    setToken(data.token)
    navigate("/home") 
    }
  } catch (e) {
    console.error(e)
  }

    // .then((res) => res.json())
    //   .then((res) => {
    //     localStorage.setItem("token", res.token)
    //     setToken(res.token)
    //     navigate("/home");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     throw new Error()
    //   })
    //   .catch((err) => {
    //     console.log("")
    //   })
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
