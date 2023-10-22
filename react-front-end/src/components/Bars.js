import React from "react";
import { useNavigate } from "react-router-dom";

export default function Bars() {

  const navigate = useNavigate();

  const changeNavigation = function(route) {
    navigate(route);
  }

  const redirectToHome = function() {
    changeNavigation("/");
  }

  return (
    <div>
      <div class="bars-full-div">
        <div>
          <div class="each-bar-div" onClick={() => changeNavigation("/takes")}>
            your takes
          </div>
          <div class="each-bar-div" onClick={() => changeNavigation("/myreplies")}>
            your replies
          </div>
          <div class="each-bar-div" onClick={() => redirectToHome()}>
            logout
          </div>
        </div>
      </div>
    </div>
  )
}