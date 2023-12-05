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
  const [display, setDisplay] = useState({
    display: "flex",
    marginTop: "25px"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);

  // change route

  const changeNavigation = function (route) {
    navigate(route);
  }

  const changeState = function (e, state) {
    state(e.target.value);
  }

  // make sure character length is less than 35

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

  const post = function (e) {
    e.preventDefault();
    setIsLoading(true);
    const username = localStorage.getItem("username");
    // ensure character length
    if (!checkTake(title) || !checkTake(take)) {
      alert("Invalid input.  Please ensure that your title/take has no words with more than 35 charachters");
    } else {
      // send body
      Axios.post("/api/posts", {
        username: username,
        title: title,
        take: take,
        userId: JSON.parse(localStorage.getItem("userId"))
      })
        .then(response => {
          console.log(response);
          window.location.reload();
        })

        .catch(error => console.error(error))
    }
    setIsLoading(false);
  }

  const returnState = function () {
      return (
        <div>
          <div><Header /></div>
          <div class="disclaimer-div" style={{ display: display.display }}>
            <div class="disclaimer">
              Please keep your post respectful and on topic. Keep your title short and descriptive and make sure that no words surpass 35 characters.  Bullying, discrimination or harrasment of any kind is strictly not allowed.  Please refer to rules on the home page for further info.
              <div class="confirm" onClick={() => setDisplay({
                display: "none",
                marginTop: "150px"
              })}>Got it!</div>
            </div>
          </div>
          <div class="add-post" style={{ marginTop: display.marginTop }}>
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

              <button type="submit" class="submit-post" method="POST" action="/api/posts" onClick={post}>post</button>
            </form>
          </div>
        </div>
      )
  }

  const returnSpinnerState = function () {
    return (
      <div>
        <div><Header /></div>
        <div><Circle /></div>
      </div>
    )
  }

  return (
    <div>
      <div>{!isLoading ? returnState() : returnSpinnerState()}</div>
    </div>
  )
}