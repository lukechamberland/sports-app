import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "../icons"
import Circle from "./Circle";
import Axios from "axios";
import { faCheck } from "../icons";
import { faComment } from "../icons";
import { faArrowRight } from "../icons";

export default function Reply(props) {

  const { header } = props;

  const [circleState, setCircleState] = useState(true);
  const [replyState, setReplyState] = useState([]);
  const [likedColorState, setLikedColorState] = useState(0);
  const [clickedReplyState, setClickedReplyState] = useState({});
  const [nestedReplyState, setNestedReplyState] = useState({});
  const [response, setResponse] = useState('');
  const [nestedResponse, setNestedResponse] = useState('');
  const [fullData, setFullData] = useState([]);
  const { reply } = useParams();

  useEffect(() => {
    Axios.get('/api/replies').then(data => {
      setFullData(data.data)
      const username = localStorage.getItem("username");
      for (let obj of data.data) {
        if (obj.id == reply) {
          setReplyState(obj);
          if (obj.likers.includes(username)) {
            setLikedColorState(1);
          }
        }
      }
    })
    setTimeout(() => {
      setCircleState(false);
    }, 500);
  }, []);

  const readLikedColorState = function () {
    if (likedColorState % 2 === 0) {
      return "grey";
    } else {
      return "rgb(230, 183, 62)";
    }
  }

  const changeLikedColorState = function () {
    const username = localStorage.getItem("username");
    setLikedColorState(likedColorState + 1);
    if (likedColorState % 2 === 0) {
      const newReplyState = {
        ...replyState,
        likes: replyState.likes + 1
      }
      setReplyState(newReplyState);
      Axios.post('/api/replies', {
        objectId: reply,
        like: true,
        isReplyLike: true,
        username
      })
    } else {
      const newReplyState = {
        ...replyState,
        likes: replyState.likes - 1
      }
      setReplyState(newReplyState);
      Axios.post('/api/replies', {
        objectId: reply,
        like: false,
        isReplyLike: true,
        username
      })
    }
  }

  const changeResponse = function (e) {
    const value = e.target.value;
    setResponse(value);
  }

  const changeNestedResponse = function (e) {
    const value = e.target.value;
    setNestedResponse(value);
  }

  const sendRequest = function () {
    const username = localStorage.getItem("username");
    setTimeout(() => {
      window.location.reload();
    }, 100);
    Axios.post('/api/replies', {
      postId: reply,
      isReplyLike: false,
      username,
      reply: response,
      replying: false,
      originalId: JSON.parse(localStorage.getItem("id")),
      userId: JSON.parse(localStorage.getItem("userId"))
    })
  }

  const changeClickState = function (id) {
    setClickedReplyState(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const changeNestedReplyState = function(id) {
    setNestedReplyState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  const sendNestedReply = function(postid) {
    const username = localStorage.getItem("username");
    setTimeout(() => {
      window.location.reload();
    }, 300);
    Axios.post("/api/replies", {
      postId: postid,
      username, 
      reply: nestedResponse
    })
  }

  function returnCorrectReplyText(id) {
    const newArray = fullData.filter((obj) => obj.postid === id && obj.post === false);
    if (newArray.length > 0) {
      return "view replies";
    } else {
      return "no replies yet :(";
    }
  }

  function returnCorrectButtonClass(id) {
    const newArray = fullData.filter((obj) => obj.postid === id && obj.post === false);
    console.log(newArray)
    if (newArray.length > 0) {
      return "view-conversation-reply-button";
    } else {
      return "view-conversation-reply-button-no-replies";
    }
  }

  function findReplies(idOfPost) {

    const filteredArray = fullData.filter((obj) => obj.postid == idOfPost && obj.post === false);
    const data = (
      <div class="full-replies">
        {filteredArray.map((obj) => (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "85%", color: "white", borderRadius: "5px", padding: "10px" }}>
                <div style={{ border: "1px solid white", padding: "20px", borderRadius: "10px" }}>
                  <div style={{ marginBottom: "15px", color: "grey", display: "flex", justifyContent: "space-between" }}>
                    <div>@ {obj.username}</div>
                    <div style={{ display: "flex" }}><button onClick={() => changeClickState(obj.id)} class={returnCorrectButtonClass(obj.id)}>{returnCorrectReplyText(obj.id)}</button><div onClick={() => changeNestedReplyState(obj.id)} class="all-replies-comment"><FontAwesomeIcon icon={faComment} /></div></div>
                  </div>
                  <div>{obj.reply}</div>
                </div>
                <div style={{ marginLeft: "25px", marginTop: "25px", color: "rgb(60, 60, 60)", fontSize: "20px" }}><FontAwesomeIcon icon={faArrowRight} rotation={90} /></div>
                <div style={{ display: nestedReplyState[obj.id] ? "block" : "none" }} class="reply-to-nested-div">
                  <div class="inner-nested-div">
                    <textarea onChange={(e) => changeNestedResponse(e)} class="reply-to-nested" placeholder="reply...">

                    </textarea>
    
                  </div>
                  <button onClick={() => sendNestedReply(obj.id)} class="nested-reply-button"><FontAwesomeIcon icon={faCheck}/></button>
                </div>
                <div style={{ display: clickedReplyState[obj.id] ? "block" : "none" }}>{findReplies(obj.id)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
    if (filteredArray.length === 0) {
      return (
        filteredArray.map((obj) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "90%", marginTop: "50px", color: "white" }}>
              <div>{obj.reply}</div>
              <div>no replies yet :(</div>
            </div>
          </div>
        )
        ))
    } else {
      return (
        <div class="my-full-data">{data}</div>
      )
    }
  }

  const returnCorrectState = function () {
    if (circleState) {
      return (
        <div>
          <div>{header}</div>
          <div>{<Circle />}</div>
        </div>
      )
    } else {
      return (
        <div>
          <div>{header}</div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <div class="full-reply" style={{ width: "80%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "50px", fontSize: "25px" }}>
                <div style={{ color: "rgb(230, 183, 62)" }}>@ {replyState.username}</div>
                <div style={{ display: "flex" }}>
                  <div style={{ color: readLikedColorState(), cursor: "pointer", marginRight: "5px" }} onClick={() => changeLikedColorState()}><FontAwesomeIcon icon={faHeart} /></div>
                  <div>{replyState.likes}</div>
                </div>
              </div>
              <div class="reply-reply">{replyState.reply}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <textarea class="nested-reply-input" style={{ width: "81.5%", color: "white", padding: "20px", borderRadius: "5px", backgroundColor: "rgb(25, 25, 25)", marginTop: "30px", fontSize: "15px", height: "100px", fontFamily: "Arial, Helvetica, sans-serif", resize: "none" }} onChange={(e) => changeResponse(e)} rows="6" placeholder="Reply..."></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "84.5%", marginBottom: "50px" }}>
              <button onClick={() => sendRequest()} class="nested-reply-button"><FontAwesomeIcon icon={faCheck} /></button>
            </div>
          </div>
          <div>
            {findReplies(reply)}
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      {returnCorrectState()}
    </div>
  )
}