import React, { useState, useEffect } from "react";
import Axios from "axios";
import Circle from "./Circle";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "../icons";

export default function YourReplies() {

  const [showCircleState, setShowCircleState] = useState(true);
  const [fullReplies, setFullReplies] = useState([]);
  const [postReplies, setPostReplies] = useState([]);

  useEffect(() => {

    const promises = [
      Axios.get("/api/replies"),
      Axios.get("/api/posts")
    ]

    Promise.all(promises)
      .then(result => {
        const [replies, posts] = result;

        const newReplies = [...replies.data, ...posts.data];
        const username = localStorage.getItem("username");
        const newFullReplies = replies.data.filter((obj) => obj.username === username);
        console.log(newFullReplies)

        const newArray = [];

        for (let obj of newFullReplies) {
          if (obj.post) {
            const newUsernameObj = newReplies.find((ele) => ele.id === obj.postid && obj.post);
            const title = newUsernameObj.title;
            const newUsername = newUsernameObj.username;
            const newObj = {
              ...obj,
              userTitle: title,
              userUsername: newUsername
            }

            newArray.push(newObj);
            
          } else {
            const newUsernameObj = newReplies.find((ele) => ele.id === obj.postid && !obj.post);
            const title = newUsernameObj.reply;
            const newUsername = newUsernameObj.username;
            const newObj = {
              ...obj,
              userTitle: title,
              userUsername: newUsername
            }

            newArray.push(newObj);
          }

          
        }


        setFullReplies(newArray);

        setTimeout(() => {
          setShowCircleState(false)
        }, 1000);


      })
  }, []);

  console.log(fullReplies)

  const returnCorrectState = function () {
    if (showCircleState) {
      return (
        <div>
          <Header />
          <Circle />
        </div>
      )
    } else {
      return (
        <div>
          <Header />
          <div class="my-replies-div">
            <div class="my-replies-verticle-div">
              <div>
                {fullReplies.map((obj) => (
                  <div class="my-replies-horizontal-div">
                    <div style={{ color: "rgb(230, 183, 62)" }}>
                      replying to @{obj.username}
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
    <div>{returnCorrectState()}</div>
  )
}