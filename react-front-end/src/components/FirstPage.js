import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";

export default function FirstPage() {

  const [displayState, setDisplayState] = useState(true);

  const navigate = useNavigate();

  const changeNav = function (route) {
    setDisplayState(false);
    setTimeout(() => {
      navigate(route);
    }, 1000)
  }

  const changeDisplayState = function () {
    if (displayState) {
      return (
        <div class="first-page-div">
          <div class="button-container">
            <button class="login-signup-button" onClick={() => changeNav('/login')}>Login</button>
            <div class="border"></div>
            <button class="login-signup-button" onClick={() => changeNav('/signup')}>Sign Up</button>
          </div>
        </div>
      )
    } else {
      return (
        <Circle />
      )
    }
  }

  return (
    <div class="page-background">
      {changeDisplayState()}
    </div>
  )
}