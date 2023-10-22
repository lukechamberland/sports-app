import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Header from "./Header";
import Circle from "./Circle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "../icons";

export default function Home(props) {

  const { header, footer } = props;

  const [postState, setPostState] = useState([]);
  const [secondState, setSecondState] = useState(false);
  const [firstFiveState, setFirstFiveState] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('/api/posts')
      .then((data) => {
        setPostState(data.data);
        if (data.data.length >= 5) {
          setFirstFiveState(getFive(data.data));
        } else {
          setFirstFiveState(1);
        }
        setTimeout(() => {
          setSecondState(true);
        }, 300);
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    Axios.get("/api/users").then(data => {
      const username = localStorage.getItem("username");
      const id = getId(data.data, username);
      localStorage.setItem("userId", JSON.stringify(id));
    })
  }, []);

  const getFive = function (array) {
    const five = [];
    const sortedArray = array.sort((a, b) => b.likes - a.likes);
    for (let i = 0; i < 5; i++) {
      five.push(sortedArray[i]);
    }
    return five;
  }

  const limitLargeCharacters = function (text) {
    const splittedText = text.split("");
    const newText = [];
    if (splittedText.length > 100) {
      for (let i = 0; i < 101; i++) {
        newText.push(splittedText[i]);
      }
    }
    const finalText = newText.join("") + "...";

    if (text.length > 100) {
      return finalText;
    } else {
      return text;
    }
  }

  const returnFirstFive = function () {
    if (firstFiveState === 1) {
      return;
    } else {
      return (
        <div class="full-first-five-container">
          <div class="first-five-container">
            <div class="for-you-divide">For you</div>
            {firstFiveState.map((obj) => (
              <div class="first-five-div" onClick={() => changeNav(obj.id)}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>{limitLargeCharacters(obj.title)}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100px" }}>
                    <div>{obj.totals} / 10</div>
                    <div style={{ display: "flex" }}><div style={{ color: "rgb(230, 183, 62)", marginRight: "5px" }}><FontAwesomeIcon icon={faHeart} /></div>{obj.likes}</div>
                  </div>
                </div>
                <div style={{ marginTop: "10px", color: "grey" }}>@ {obj.username}</div>
                <div style={{ marginTop: "30px" }}>{limitLargeCharacters(obj.take)}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  const getId = function (array, username) {
    const correctObj = array.find((obj) => obj.username === username);
    return correctObj.id;
  }

  const changeNav = function (num) {
    localStorage.setItem("id", JSON.stringify(num));
    navigate(`/home/${num}`);
  }

  const limitCharacters = function (text) {
    const splitText = text.split("");
    const newArray = [];
    for (let i = 0; i < 26; i++) {
      newArray.push(splitText[i]);
    }
    const newText = newArray.join("");

    if (text.length > 25) {
      return newText + "...";
    } else {
      return text;
    }
  }

  const mappedData = function () {
    return postState.map((ele) => (
      <div class="take-div" onClick={() => changeNav(ele.id)}>
        <div class="title-totals-likes-div">
          <div>
            {limitCharacters(ele.title)}
          </div>
          <div>
            <div class="totals-likes-div">
              <div style={{ width: "100px" }}>{ele.totals} / 10</div>
              <div style={{ display: "flex" }}><div style={{ marginRight: "5px", color: "rgb(230, 183, 62)" }}><FontAwesomeIcon icon={faHeart} /></div>{ele.likes}</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px", color: "grey" }}>@ {ele.username}</div>
        <div style={{ marginTop: "30px", color: "grey" }}>{limitCharacters(ele.take)}</div>
      </div>
    ))
  }

  const returnState = function () {
    if (secondState) {
      return (
        <div>
          <div>{header}</div>
          <div></div>
          <div>{returnFirstFive()}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ backgroundColor: "grey", height: "1px", width: "83%" }}></div>
          </div>
          <div class="home-page">
            <div class="take-div-container">{mappedData()}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>{<Header />}</div>
          <div>{<Circle />}</div>
        </div>
      )
    }
  }

  return (
    <div>
      {returnState()}
      <div>{footer}</div>
    </div>
  )
}

