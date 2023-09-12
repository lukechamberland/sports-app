import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [fullData, setFullData] = useState([]);

  const [correctInfoState, setCorrectInfoState] = useState(0);

  const navigate = useNavigate();

  const changeNav = function (route) {
    navigate(route);
  }

  const changeInfoState = function (num) {
    setCorrectInfoState(num);
    setFormData({ ...formData, password: "" });
  }

  const doesEmailExist = function () {

    let value = false;

    for (let obj of fullData) {
      if (obj.email === formData.email) {
        value = true;
      }
    }
    return value;
  }

  const checkPassword = function (arr) {
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
      setCorrectInfoState(1)
      return;
    } else if (!nextCondition) {
      setCorrectInfoState(2)
      return;
    }
    changeNav('/home');

  }

  const changeEmailState = function () {
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

  const changePasswordState = function () {
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

  const callStateChange = function () {
    changeEmailState();
    changePasswordState();
  }

  const returnCorrectDiv = function () {
    if (correctInfoState === 0) {
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
    } else if (correctInfoState === 1) {
      return (
        <div class="incorrect-email-div">
          <div>
            <h2>Email does not exist, please sign up.</h2>
            <button class="incorrect-email-button" onClick={() => changeNav('/signup')}>Sign Up</button>
          </div>
        </div>
      )
    } else {
      return (
        <div class="incorrect-password-div">
          <div>
            <h2>Password is incorrect.</h2>
            <button class="incorrect-password-button" onClick={() => changeInfoState(0)}>Try again</button>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      {returnCorrectDiv()}
    </div>
  )
}