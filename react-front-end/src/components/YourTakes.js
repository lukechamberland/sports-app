import React, { useState, useEffect } from "react";
import Circle from "./Circle";
import Axios from "axios";
import Header from "./Header"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "../icons";
import { faX } from "../icons";

export default function YourTakes() {

  const navigate = useNavigate();

  const changeNavigation = function (route) {
    navigate(route);
  }

  const [circleState, setCircleState] = useState(true);
  const [takesArray, setTakesArray] = useState([]);
  const [repliesForPost, setRepliesForPost] = useState([]);
  const [showConfirmDiv, setShowConfirmDiv] = useState({
    display: "none",
    id: null
  })

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

        const findReplies = function (postId) {
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
    for (let i = 0; i < 12; i++) {
      newArray.push(splitString[i]);
    }
    const newTitle = newArray.join('');

    if (string > 12) {
      return newTitle + "...";
    } else {
      return string;
    }
  }

  const deletePost = function (objectId) {
    window.location.reload();
    Axios.post("/api/posts", {
      id: objectId
    })
  }

  const showConfirmState = function () {
    return (
      <div style={{ position: "fixed", width: "100%", height: "80%", display: "flex", justifyContent: "center", zIndex: "1" }}>
        <div style={{ display: "flex", height: "100%", alignItems: "center", width: "300px" }}>
          <div style={{ display: "flex", justifyContent: "center", backgroundColor: "white", padding: "30px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 style={{ fontSize: "25px" }}>Delete this post?</h1>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", color: "grey" }}>This action cannot be undone</div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <button onClick={() => deletePost(showConfirmDiv.id)} class="confirm-delete">Delete</button>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <button class="confirm-delete" onClick={() => setShowConfirmDiv({
                  display: "none",
                  id: null
                })}>Don't delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ color: "white", marginBottom: "10px" }}>{obj.replyCount} reply(s)</div>
                        <div style={{ color: "white" }}>{obj.likes} likes</div>
                      </div>
                      <div>
                        <div onClick={(e) => {
                          e.stopPropagation();
                          setShowConfirmDiv({
                            display: "block",
                            opacity: "50%",
                            id: obj.id
                          })
                        }} class="garbage" style={{ marginTop: "20px", fontSize: "20px" }}><FontAwesomeIcon icon={faTrash} /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {takesArray[1].map((obj) => (
                  <div class="your-take" onClick={() => changeNavigation(`/home/${obj.id}`)}>
                    <h1 style={{ fontWeight: "400", color: "rgb(230, 183, 62)" }}>{limitCharacters(obj.title)}</h1>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ color: "white", marginBottom: "10px" }}>{obj.replyCount} reply(s)</div>
                        <div style={{ color: "white" }}>{obj.likes} likes</div>
                      </div>
                      <div>
                        <div onClick={(e) => {
                          e.stopPropagation();
                          setShowConfirmDiv({
                            display: "block",
                            opacity: "50%",
                            id: obj.id
                          })
                        }} class="garbage" style={{ marginTop: "20px", fontSize: "20px" }}><FontAwesomeIcon icon={faTrash} /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {takesArray[2].map((obj) => (
                  <div class="your-take" onClick={() => changeNavigation(`/home/${obj.id}`)}>
                    <h1 style={{ fontWeight: "400", color: "rgb(230, 183, 62)" }}>{limitCharacters(obj.title)}</h1>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ color: "white", marginBottom: "10px" }}>{obj.replyCount} reply(s)</div>
                        <div style={{ color: "white" }}>{obj.likes} likes</div>
                      </div>
                      <div>
                        <div onClick={(e) => {
                          e.stopPropagation();
                          setShowConfirmDiv({
                            display: "block",
                            opacity: "50%",
                            id: obj.id
                          })
                        }} class="garbage" style={{ marginTop: "20px", fontSize: "20px" }}><FontAwesomeIcon icon={faTrash} /></div>
                      </div>
                    </div>
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
    <div>
      <div style={{ display: showConfirmDiv.display, zIndex: "1" }}>{showConfirmState()}</div>
      <div style={{ opacity: showConfirmDiv.opacity, zIndex: "0" }}>{returnCorrectState()}</div>
    </div>
  )
}