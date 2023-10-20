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

        for (let i = 0; i < newArray.length; i++) {
          const originalPost = post.data.find((obj) => newArray[i].originalpostid === obj.id);
          let originalUser = null;
          if (newArray[i].post) {
            const correctPostObj = post.data.find((obj) => obj.id === newArray[i].postid)
            originalUser = correctPostObj.username;
            const newObj = {
              ...newArray[i],
              originaluser: originalUser
            }
            newArray[i] = newObj;
          } else {
            const correctPostObj = replies.data.find((obj) => obj.id === newArray[i].postid)
            originalUser = correctPostObj.username;
            const newObj = {
              ...newArray[i],
              originaluser: originalUser
            }
            newArray[i] = newObj;
          }
          const newObj = {
            ...newArray[i],
            originaltitle: originalPost.title
          }
          newArray[i] = newObj;
        }

        setFullReplies(newArray);

        setTimeout(() => {
          setShowCircleState(false)
        }, 1000);

      })
  }, []);

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