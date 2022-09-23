import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../../configs/api_url";

export default function Register() {
 
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    password: "",
    username: "",
    email: "",
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
      const response = await fetch(REGISTER_URL, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
      
    })
    if(response.status === 201) {
    navigate("/auth") 
    }
  } catch (e) {
    console.error(e)
  }
}

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <div className="">
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label>Lastname</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label>E-mail</label>
          <input
            type="email"
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
          Register
        </button>
      </form>
    </div>
  );
}
