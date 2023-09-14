import React from "react";
import { useNavigate } from "react-router-dom";

export default function FirstPage() {

  const navigate = useNavigate();

  const changeNav = function(route) {
    navigate(route);
  }

  return (
    <div class="first-page-div">
      <div class="button-container">
        <button class="login-signup-button" onClick={() => changeNav('/login')}>Login</button>
        <div class="border"></div>
        <button class="login-signup-button" onClick={() => changeNav('/signup')}>Sign Up</button>
      </div>
    </div>
  )
}