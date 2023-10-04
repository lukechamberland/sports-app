import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Header from "./Header";
import Circle from "./Circle";

export default function Home(props) {

  const { header } = props;

  const [postState, setPostState] = useState([]);

  const [secondState, setSecondState] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('/api/posts')
      .then((data) => {
        setPostState(data.data);
        setTimeout(() => {
          setSecondState(true);
        }, 300);
      })
      .catch((error) => console.error(error))
  }, [])

  const changeNav = function (num) {
    localStorage.setItem("id", JSON.stringify(num));
    navigate(`/home/${num}`);
  }

  const mappedData = function () {
    return postState.map((ele, index) => (
      <div class="take-div" onClick={() => changeNav(index + 1)}>{ele.title}</div>
    ))
  }

  const returnState = function() {
    if (secondState) {
      return (
        <div>
          <div>{header}</div>
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
    </div>
  )
}

