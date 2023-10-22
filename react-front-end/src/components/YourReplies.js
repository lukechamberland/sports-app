import React, { useState, useEffect } from "react";
import Axios from "axios";
import Circle from "./Circle";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function YourReplies() {

  const [showCircleState, setShowCircleState] = useState(true);
  const [fullReplies, setFullReplies] = useState([]);

  const navigation = useNavigate();

  const changeNavigation = function (route) {
    navigation(route);
  }

  useEffect(() => {

    const promises = [
      Axios.get("/api/replies"),
      Axios.get("/api/posts")
    ]

    Promise.all(promises)
      .then(result => {

        const [replies, post] = result;
        const username = localStorage.getItem("username");
        const newArray = replies.data.filter((obj) => obj.username === username);
        const secondNewArray = newArray.reverse();

        // find correct replies and set them in an array

        for (let i = 0; i < secondNewArray.length; i++) {
          if (secondNewArray[i].post) {
            const correctPostObj = post.data.find((obj) => obj.id === secondNewArray[i].postid);
            const originalUser = correctPostObj.username;
            const originalTitle = correctPostObj.title
            const newObj = {
              ...secondNewArray[i],
              originaluser: originalUser,
              originaltitle: originalTitle
            }
            secondNewArray[i] = newObj;
          } else {
            const correctPostObj = replies.data.find((obj) => obj.id === secondNewArray[i].postid);
            const originalUser = correctPostObj.username;
            const correctPostId = post.data.find((obj) => obj.id === correctPostObj.originalpostid);
            const originalTitle = correctPostId.title;
            const newObj = {
              ...secondNewArray[i],
              originaluser: originalUser,
              originaltitle: originalTitle
            }
            secondNewArray[i] = newObj;
          }
        }

        setFullReplies(secondNewArray);

        setTimeout(() => {
          setShowCircleState(false)
        }, 1000);

      })
  }, []);

  // ensure there are replies

  const checkReplies = function (array) {
    if (array.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const returnCorrectState = function () {
    if (showCircleState) {
      return (
        <div>
          <Header />
          <Circle />
        </div>
      )
    } else {
      if (!checkReplies(fullReplies)) {
        return (
          <div>
            <div><Header /></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ color: "white", fontSize: "40px", marginTop: "350px", fontWeight: "600" }}>No replies yet :(</div>
            </div>
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
                    <div class="my-replies-horizontal-div" onClick={() => changeNavigation(`/home/${obj.originalpostid}`)}>
                      <div style={{ color: "rgb(230, 183, 62)" }}>
                        replying under "{obj.originaltitle}"
                      </div>
                      <div style={{ color: "grey", marginTop: "10px" }}>
                        replying to @ {obj.originaluser}
                      </div>
                      <div style={{ color: "white", marginTop: "50px" }}>
                        {obj.reply}
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
  }

  return (
    <div>{returnCorrectState()}</div>
  )
}