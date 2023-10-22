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
import Axios from "axios";
import SearchCircle from "./SearchCircle";

export default function Header() {

  const navigate = useNavigate();

  const [barsState, setBarsState] = useState(false);
  const [showSearchState, setShowSearchState] = useState([]);
  const [searchContainer, setSearchContainer] = useState("none");
  const [searchLoadingState, setSearchLoadingState] = useState(false);

  const getSearch = function (e) {
    const value = e.target.value;
    setSearchLoadingState(true);
    setTimeout(() => {
      setSearchLoadingState(false);
    }, 1000);
    if (!value) {
      setShowSearchState([]);
      setSearchContainer("none");
    } else {
      setSearchContainer("block");
      Axios.get("/api/posts").then(data => {
        const newData = data.data;
        const length = data.data.length;
        console.log(length);
        getValue(newData, value, length);
      })
    }
  }

  const getValue = function (array, text, number) {
    const displayArray = [];
    for (let i = 0; i < number; i++) {
      if (array[i].title.includes(text) || array[i].take.includes(text)) {
        displayArray.push(array[i]);
      }
    }
    if (displayArray.length > 5) {
      const newArray = [];
      for (let i = 0; i < 5; i++) {
        newArray.push(displayArray[i]);
      }
      setShowSearchState(newArray);
    } else {
      setShowSearchState(displayArray);
    }
  }

  const changeState = () => {
    setBarsState(!barsState);
  }

  const changeNavigateForSearch = function(route) {
    navigate(route);
    window.location.reload();
  }

  const changeNavigate = function(route) {
    navigate(route);
  }

  const returnName = function () {
    const name = localStorage.getItem("name");
    return name;
  }

  const returnLoadingState = function () {
    const data = (
      <div>{SearchCircle()}</div>
    )
    return data;
  }

  const returnSearch = function () {
    const data = showSearchState.map((ele) => (
      <div class="each-searched-item" onClick={() => changeNavigateForSearch(`/home/${ele.id}`)}>
        <div style={{ marginLeft: "10px" }}>{ele.title}<div style={{ color: "grey" }}>@{ele.username}</div></div>
      </div>
    ))
    if (showSearchState.length === 0) {
      return;
    }
    return data;
  }

  return (
    <div>
      <div class="header">
        <div class="left-side-header">
          <div class="house" onClick={() => changeNavigate("/home")}>
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <div class="user" onClick={() => changeNavigate("/profile")}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div class="hello-first-name" style={{ width: "300px" }}>
            Hello, {returnName()}
          </div>
        </div>
        <div class="right-side-header">
          <div class="header-input-div">
            <input
              class="header-input"
              placeholder="Search..."
              onChange={(e) => getSearch(e)}
            />
            <div class="search-container" style={{ display: searchContainer, zIndex: "1000" }}>{searchLoadingState ? returnLoadingState() : returnSearch()}</div>
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