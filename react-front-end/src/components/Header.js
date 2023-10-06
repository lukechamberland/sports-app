import React from "react";
import { faUser } from "../icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "../icons";
import { faBars } from "../icons";
import { faHouse } from "../icons";
import { useNavigate } from "react-router-dom";
import { faPlus } from "../icons";
import Bars from "./Bars";
import { useState } from "react";

export default function Header() {

  const navigate = useNavigate();

  const [barsState, setBarsState] = useState(false);

  const changeState = () => {
    setBarsState(!barsState);
  }

  const changeNavigate = function (route) {
    navigate(route);
  }

  const returnName = function () {
    const name = localStorage.getItem("name");
    return name;
  }

  return (
    <div>
      <div class="header">
        <div class="left-side-header">
          <div class="house" onClick={() => changeNavigate('/home')}>
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <div class="user">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div class="hello-first-name">
            Hello, {returnName()}
          </div>
        </div>
        <div class="right-side-header">
          <div class="header-input-div">
            <input
              class="header-input"
              placeholder="Search..."
            />
          </div>
          <div class="right-side-header-right">
            <div class="header-plus" onClick={() => changeNavigate('/Add')}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div class="header-heart" onClick={() => changeNavigate('/likes')}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div class="bars" onClick={changeState}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: barsState ? "block" : "none" }}>
        <Bars />
      </div>
    </div>
  )
}