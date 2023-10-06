import React, { useState, useEffect } from "react";
import Circle from "./Circle";
import Axios from "axios";
import Header from "./Header"
import { useNavigate } from "react-router-dom";

export default function YourTakes() {

  const navigate = useNavigate();

  const changeNavigation = function (route) {
    navigate(route);
  }

  const [circleState, setCircleState] = useState(true);
  const [takesArray, setTakesArray] = useState([]);
  const [repliesForPost, setRepliesForPost] = useState([]);

  useEffect(() => {

    const promises = [
      Axios.get("/api/posts"),
      Axios.get("/api/replies")
    ]

    Promise.all(promises)
      .then(results => {
        const [posts, replies] = results;

        const firstArray = [];
        const secondArray = [];
        const thirdArray = [];

        const username = localStorage.getItem("username");
        const fullDataArray = posts.data.filter((obj) => obj.username === username);

        const findReplies = function(postId) {
          let num = 0;
          for (let obj of replies.data) {
            if (obj.postid === postId) {
              num += 1;
            }
          }
          return num;
        }

        for (let i = 0; i < fullDataArray.length; i += 3) {
          const correctNum = findReplies(fullDataArray[i].id);
          const obj = {
            ...fullDataArray[i],
            replyCount: correctNum
          }
          firstArray.push(obj);
        }
  
        for (let i = 1; i < fullDataArray.length; i += 3) {
          const correctNum = findReplies(fullDataArray[i].id);
          const obj = {
            ...fullDataArray[i],
            replyCount: correctNum
          }
          secondArray.push(obj);
        }
  
        for (let i = 2; i < fullDataArray.length; i += 3) {
          const correctNum = findReplies(fullDataArray[i].id);
          const obj = {
            ...fullDataArray[i],
            replyCount: correctNum
          }
          thirdArray.push(obj);
        }
        setTakesArray([firstArray, secondArray, thirdArray]);

      })

    setTimeout(() => {
      setCircleState(false)
    }, 1500)
  }, []);

  const limitCharacters = function (string) {
    const newArray = [];
    const splitString = string.split('');
    for (let i = 0; i < 15; i++) {
      newArray.push(splitString[i]);
    }
    const newTitle = newArray.join('');

    if (string > 14) {
      return newTitle + "...";
    } else {
      return string;
    }
  }

  const returnCorrectState = function () {
    if (circleState) {
      return (
        <Circle />
      )
    } else {
      return (
        <div>
          <div><Header /></div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "85%" }}>
              <div>
                {takesArray[0].map((obj) => (
                  <div class="your-take" onClick={() => changeNavigation(`/home/${obj.id}`)}>
                    <h1 style={{ fontWeight: "400", color: "rgb(230, 183, 62)" }}>{limitCharacters(obj.title)}</h1>
                    <div style={{ color: "white", marginBottom: "10px" }}>{obj.replyCount} reply(s)</div>
                    <div style={{ color: "white" }}>{obj.likes} likes</div>
                  </div>
                ))}
              </div>
              <div>
                {takesArray[1].map((obj) => (
                  <div class="your-take" onClick={() => changeNavigation(`/home/${obj.id}`)}>
                    <h1 style={{ fontWeight: "400", color: "rgb(230, 183, 62)" }}>{limitCharacters(obj.title)}</h1>
                    <div style={{ color: "white", marginBottom: "10px" }}>{obj.replyCount} reply(s)</div>
                    <div style={{ color: "white" }}>{obj.likes} likes</div>
                  </div>
                ))}
              </div>
              <div>
                {takesArray[2].map((obj) => (
                  <div class="your-take" onClick={() => changeNavigation(`/home/${obj.id}`)}>
                    <h1 style={{ fontWeight: "400", color: "rgb(230, 183, 62)" }}>{limitCharacters(obj.title)}</h1>
                    <div style={{ color: "white", marginBottom: "10px" }}>{obj.replyCount} reply(s)</div>
                    <div style={{ color: "white" }}>{obj.likes} likes</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <div>{returnCorrectState()}</div>
  )
}