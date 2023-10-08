import React, { useState, useEffect } from "react";
import Axios from "axios";
import Circle from "./Circle";
import Header from "./Header";

import { useNavigate } from "react-router-dom";

export default function AddPost() {

  const [firstState, setFirstState] = useState(false);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  const [take, setTake] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFirstState(true)
    }, 1000);
  }, [])

  const changeNavigation = function (route) {
    navigate(route);
  }

  const changeState = function (e, state) {
    state(e.target.value);
  }

  const checkTake = function (string) {
    const splitString = string.split(' ');
    for (let str of splitString) {
      if (str.length > 35) {
        return false;
      } else {
        return true;
      }
    }
  }

  const post = function () {
    const username = localStorage.getItem("username");
    if (!checkTake(title) || !checkTake(take)) {
      alert("Invalid input.  Please ensure that your title/take has no words with more than 35 charachters");
      return;
    } else {
      changeNavigation('/home')
      Axios.post("/api/posts", {
        username: username,
        title: title,
        take: take
      })
        .then(response => {
          console.log(response)
        })

        .catch(error => console.error(error))
    }
  }

  const returnState = function () {
    if (firstState) {
      return (
        <div>
          <div><Header /></div>
          <div class="add-post">
            <form class="add-post-form">
              <input
                class="add-title"
                placeholder="your title..."
                id="title"
                onChange={(e) => changeState(e, setTitle)}
              />

              <textarea style={{ resize: "none" }}
                class="add-new-take"
                placeholder="your take..."
                id="take"
                onChange={(e) => changeState(e, setTake)}
              ></textarea>

              <button type="submit" class="submit-post" onClick={() => post()}>post</button>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div><Header /></div>
          <div><Circle /></div>
        </div>
      )
    }
  }

  return (
    <div>
      <div>{returnState()}</div>
    </div>
  )
}