import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";

export default function SignUp() {

  const navigate = useNavigate();

  const changeNavigate = function (route) {
    navigate(route);
  }

  const [checkEmailState, setCheckEmailState] = useState(false);

  const [clickCount, setClickCount] = useState(0);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: ''
  });

  const [emailState, setEmailState] = useState({
    email: "email-input",
    placeholderText: "Enter your email"
  });

  const [passwordState, setPasswordState] = useState({
    password: "email-input",
    placeholderText: "Enter a password"
  });

  const [firstnameState, setFirstnameState] = useState({
    firstname: "email-input",
    placeholderText: 'First name'
  });

  const [lastnameState, setLastnameState] = useState({
    lastname: "email-input",
    placeholderText: "Last name"
  });

  const [usernameState, setUsernameState] = useState({
    username: "email-input",
    placeholderText: "Enter your Username"
  })

  // change the formData state

  const changeInput = (e) => {
    const newData = { ...formData }
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }

  // send post request to the backend

  const handleSubmit = function (e) {
    e.preventDefault();

    callUserNameStateChange();

    // ensure that every email is unique

    fetch("/api/users").then(response => response.json()).then(data => {
      for (let ele of data) {
        if (ele.email === formData.email) {
          alert("Email already exists, please log in.")
          return;
        }
      }

      fetch("/api/users", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((data) => {
          localStorage.setItem("username", formData.username);
          console.log(data);
          changeClickCount(4);
          setTimeout(() => {
            changeNavigate('/home');
          }, 1500)
        })
        .catch((error) => {
          console.error(error);
        });
    })
  }

  // alert user that inputs cannot be left emtpy

  const changeState = function (id, callback) {
    const input = document.getElementById(id);
    const length = input.value;

    const emptyEmailState = {
      [id]: "empty-email-input",
      placeholderText: "This field cannot be left empty."
    }

    if (length === "") {
      callback(emptyEmailState);
    }
  }

  // change the email state if inputs are left empty

  const callEmailStateChange = function () {

    // ensure that email doesn't exist

    fetch("/api/users").then(response => response.json()).then(data => {
      for (let ele of data) {
        if (ele.email === formData.email) {
          setCheckEmailState(true);
          return;
        }
      }
    }).then(() => {
      changeState("email", setEmailState);
      changeState("password", setPasswordState);

      if (formData.email === '' || formData.password === '') {
        return;
      } else {
        changeClickCount(3);
        setTimeout(() => {
          changeClickCount(1);
        }, 1200)
      }
    })
  }

  // change name state if inputs are left empty

  const callNameStateChange = function () {
    changeState("firstname", setFirstnameState);
    changeState("lastname", setLastnameState);

    if (formData.firstname === '' || formData.lastname === '') {
      return;
    } else {
      changeClickCount(4);
        setTimeout(() => {
          changeClickCount(2);
        }, 1200)
    }
  }

  // change username state if input is left empty

  const callUserNameStateChange = function () {
    changeState("username", setUsernameState);

    if (formData.username === '') {
      return;
    }
  }

  const changeClickCount = function (num) {
    setClickCount(num);
  }

  const returnDiv = function () {
    if (clickCount === 0) {
      return (
        <div class="login-form">
          <h1 style={{color: "white"}}>Sign up</h1>
          <input
            onChange={(e) => changeInput(e)}
            id="email"
            class={emailState.email}
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
            method="POST"
            type="password"
            name="password"
            value={formData.password}
            placeholder={passwordState.placeholderText}
          />
          <button class="submit-button" onClick={() => callEmailStateChange()}>Next</button>
        </div>
      )
    } else if (clickCount === 1) {
      if (checkEmailState) {
        alert("This email already exists. Please login or use a different email adress.");
        setClickCount(0);
      } else {
        return (
          <div class="login-form">
            <h1 style={{color: "white"}}>What's your name?</h1>
            <input
              onChange={(e) => changeInput(e)}
              id="firstname"
              class={firstnameState.firstname}
              method="POST"
              type="text"
              name="firstname"
              value={formData.firstname}
              placeholder={firstnameState.placeholderText}
            />

            <input
              onChange={(e) => changeInput(e)}
              id="lastname"
              class={lastnameState.lastname}
              method="POST"
              type="text"
              name="lastname"
              value={formData.lastname}
              placeholder={lastnameState.placeholderText}
            />
            <button class="submit-button" onClick={() => callNameStateChange()}>Next</button>
          </div>
        )
      }
    } else if (clickCount === 2) {
      return (
        <div class="login-form">
          <h1 style={{color: "white"}}>Please enter a username</h1>
          <input
            onChange={(e) => changeInput(e)}
            id="username"
            class={usernameState.username}
            method="POST"
            type="text"
            name="username"
            value={formData.username}
            placeholder={usernameState.placeholderText}
          />
          <button type="submit" class="submit-button" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      ) 
    } else {
      return (
        <Circle />
      )
    }
  }

  return (
    <div class="login-form-page">
      <form action="/api/users" method="POST" onSubmit={(e) => e.preventDefault()}>
        {returnDiv()}
      </form>
    </div>
  )
}