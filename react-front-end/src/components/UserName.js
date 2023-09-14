import React, { useState } from "react";

export default function UserName() {

  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
  });

  const [emailState, setEmailState] = useState({
    email: "email-input",
    placeholderText: "First name"
  });

  const [passwordState, setPasswordState] = useState({
    password: "email-input",
    placeholderText: "Last name"
  });

  const changeEmailState = function() {
    const input = document.getElementById("firstname");
    const length = input.value;

    const emptyEmailState = {
      email: "empty-email-input",
      placeholderText: "This field cannot be left empty."
    }

    if (length === "") {
      setEmailState(emptyEmailState);
      return;
    }
  }

  const changePasswordState = function() {
    const input = document.getElementById("lastname");
    const length = input.value;

    const emptyPasswordState = {
      password: "empty-email-input",
      placeholderText: "This field cannot be left empty."
    }

    if (length === "") {
      setPasswordState(emptyPasswordState);
      return;
    }
  }

  const callStateChange = function() {
    changeEmailState();
    changePasswordState();
  }

  const changeFormState = function (e) {
    const newState = { ...formState }
    newState[e.target.id] = e.target.value;
    setFormState(newState);
  }

  return (
    <div class="login-form-page">
      <div class="login-form">
        <h1>What's your name?</h1>
        <input
          onChange={(e) => changeFormState(e)}
          id="firstname"
          class={emailState.email}
          action="/api/users"
          method="POST"
          type="text"
          name="firstname"
          value={formState.firstname}
          placeholder={emailState.placeholderText}
        />

        <input
          onChange={(e) => changeFormState(e)}
          id="lastname"
          class={passwordState.password}
          action="/api/users"
          method="POST"
          type="text"
          name="lastname"
          value={formState.lastname}
          placeholder={passwordState.placeholderText}
        />

        <button class="submit-button" onClick={() => callStateChange()}>Next</button>
      </div>
    </div>
  )
}