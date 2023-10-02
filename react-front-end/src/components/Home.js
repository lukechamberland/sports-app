import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Home(props) {

  const { header } = props;

  const [postState, setPostState] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('/api/posts')
      .then((data) => {
        setPostState(data.data);
      })
      .catch((error) => console.error(error))
  }, [])

  const changeNav = function (num) {
    localStorage.setItem("id", JSON.stringify(num));
    navigate(`/home/${num}`);
  }

  const mappedData = function () {
    return postState.map((ele, index) => (
      <div class="take-div" style={{ color: "white" }} onClick={() => changeNav(index + 1)}>{ele.title}</div>
    ))
  }

  return (
    <div>
      <div>{header}</div>
      <div class="home-page">
        <div class="take-div-container">{mappedData()}</div>
      </div>
    </div>
  )
}

