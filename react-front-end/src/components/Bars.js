import React from "react";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";

export default function Bars() {

  const navigate = useNavigate();

  const changeNavigation = function(route) {
    navigate(route);
  }

  return (
    <div>
      <div class="bars-full-div">
        <div>
          <div class="each-bar-div" onClick={() => changeNavigation("/takes")}>
            your takes
          </div>
          <div class="each-bar-div">
            your replies
          </div>
        </div>
      </div>
    </div>
  )
}