import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [fullData, setFullData] = useState([]);

  const navigate = useNavigate();

  const changeNav = function(route) {
    navigate(route);
  }

  const doesEmailExist = function() {
    
    let value = false;

    for (let obj of fullData) {
      if (obj.email === formData.email) {
        value = true;
      }
    }
    return value;
  }

  const checkPassword = function(arr) {
    let condition = true;
    let correctObj = {}
    for (let obj of arr) {
      if (obj.email === formData.email) {
        correctObj = obj;
      }
    }
    if (correctObj.password !== formData.password) {
      condition = false;
    }
    return condition;
  }

  useEffect(() => {
    axios.get("/api/users")
    .then(arr => {
      setFullData(arr.data)
    })
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [emailState, setEmailState] = useState({
    email: "email-input",
    placeholderText: "Enter your email"
  });
  
  const [passwordState, setPasswordState] = useState({
    password: "email-input",
    placeholderText: "Enter a password"
  });

  const changeInput = (e) => {
    const newData = { ...formData }
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const condition = doesEmailExist();
    const nextCondition = checkPassword(fullData);

      if (formData.email === '' || formData.password === '') {
        return;
      } else if (!condition) {
        alert("email does not exist, please sign up.")
        return;
      } else if (!nextCondition) {
        alert('Password is incorrect.')
        return;
      }
      changeNav('/home');
    
  }

  const changeEmailState = function() {
    const input = document.getElementById("email");
    const length = input.value;

    const emptyEmailState = {
      email: "empty-email-input",
      placeholderText: "This field cannot be left empty."
    }

    if (length === "") {
      setEmailState(emptyEmailState);
    }
  }

  const changePasswordState = function() {
    const input = document.getElementById("password");
    const length = input.value;

    const emptyPasswordState = {
      password: "empty-email-input",
      placeholderText: "This field cannot be left empty."
    }

    if (length === "") {
      setPasswordState(emptyPasswordState);
    }
  }

  const callStateChange = function() {
    changeEmailState();
    changePasswordState();
  }

  return (
    <div class="login-form-page">
      <form class="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input 
          onChange={(e) => changeInput(e)}
          id="email"
          class={emailState.email}
          action="/api/users"
          method="POST"
          type="email"
          name="email"
          value={formData.email}
          placeholder={emailState.placeholderText}
        />

        <input 
          onChange={(e) => changeInput(e)}
          id="password"
          class={passwordState.password}
          action="/api/users"
          method="POST"
          type="password"
          name="password"
          value={formData.password}
          placeholder={passwordState.placeholderText}
        />

        <button type="submit" class="submit-button" onClick={() => callStateChange()}>Submit</button>
      </form>
    </div>
  )
}