import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { faHeart } from "../icons";
import { faCheckToSlot } from "../icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "../icons";
import { faComment } from "../icons";

export default function Post(props) {

  const { circle, header } = props;

  const [postLikes, setPostLikes] = useState(0);
  const [likesArray, setLikesArray] = useState([]);
  const [postId, setPostId] = useState(0);
  const [hasUserVoted, setHasUserVoted] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submit, setSubmit] = useState(1);
  const [showDiv, setShowDiv] = useState("vote-div-hide");
  const [averageState, setAverageState] = useState(0);
  const [voteState, setVoteState] = useState([]);
  const [initialInputValue, setInitialInputValue] = useState('');
  const [inputValue, setInputValue] = useState(5);
  const [postPageState, setPostPageState] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [colorState, setColorState] = useState(0);
  const [repliesState, setRepliesState] = useState([]);
  const [openReply, setOpenReply] = useState(0);
  const [responseState, setResponseState] = useState('');
  const [placeHolderState, setPlaceHolderState] = useState('Reply...');
  const [usernameState, setUsernameState] = useState('');
  const [replyLikes, setReplyLikes] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const changeNavigation = function (route) {
    navigate(route);
  }

  useEffect(() => {
    Axios.get("/api/posts").then((data) => {
      setPostId(id);
      for (let ele of data.data) {
        if (ele.id == id) {
          setUsernameState(ele.username)
          setPostPageState(ele);
          setVoteState(ele.votes);
          setInitialInputValue(ele.totals);
          setPostLikes(ele.likes);
          if (ele.totals > 0) {
            setAverageState((ele.totals / (parseInt(ele.votes))).toFixed(2));
          } else {
            setAverageState(0);
          }
        }
      }
      const arr = data.data;
      const username = localStorage.getItem("username");
      const post = JSON.parse(localStorage.getItem("id"));
      const correctPost = arr.find((ele) => ele.id === post);
      const correctArray = correctPost.voters;
      if (correctArray.includes(username)) {
        setHasUserVoted(true);
      }

      setTimeout(() => {
        setLoadingState(false);
      }, 500)
    })
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    Axios.get("/api/users").then(data => {
      const username = localStorage.getItem("username");
      let arr = [];
      for (let obj of data.data) {
        if (obj.username === username) {
          setLikesArray([...obj.likes]);
          arr = [...obj.likes];
        }
      }
      if (arr.includes(parseInt(id, 10))) {
        setColorState(1);
      }
      console.log(arr)
    })
  }, []);

  useEffect(() => {
    Axios.get("/api/replies")
      .then(data => {
        const commentArray = [];
        const valuesArray = [];
        const username = localStorage.getItem("username");
        for (let obj of data.data) {
          if (obj.postid == id) {
            commentArray.push(obj);
            console.log(obj.likers)
            if (obj.likers.includes(username)) {
              valuesArray.push(1);
            } else {
              valuesArray.push(0);
            }
          }
        }
        setReplyLikes(valuesArray);
        setRepliesState(commentArray.sort((a, b) => b.likes - a.likes));
      })
  }, []);

  const triggerVote = function () {
    setLoadingState(true);
    setSubmit(submit + 1);
    setIsSubmit(true);

    setTimeout(() => {
      setLoadingState(false);
    }, 2000);

    const newVal = inputValue + initialInputValue;
    setVoteState(voteState + 1);
    const id = JSON.parse(localStorage.getItem("id"));
    Axios.post(`/api/posts/${id}`, {
      like: false,
      vote: newVal,
      id: JSON.parse(localStorage.getItem("id")),
      username: localStorage.getItem("username")
    }).then(response => {
      console.log(response)
    }).catch(error => console.log(error))
  }

  const sendVoteObj = function () {
    setHasUserVoted(true);
    triggerVote();
    setAverageState(((inputValue + initialInputValue) / (voteState + 1)).toFixed(2));
  }

  const isClicked = function () {
    if (likesArray.includes(parseInt(id, 10))) {
      if (colorState === 1) {
        return "liked-heart";
      } else if (colorState % 2 !== 0) {
        return "heart-animation";
      } else {
        return "heart";
      }
    } else {
      if (colorState % 2 !== 0) {
        return "heart-animation";
      } else {
        return "heart";
      }
    }
  }

  const increaseInputValue = function () {
    if (inputValue < 10) {
      setInputValue(inputValue + 0.5);
    } else {
      return;
    }
  }

  const decreaseInputValue = function () {
    if (inputValue > 0) {
      setInputValue(inputValue - 0.5);
    } else {
      return;
    }
  }

  const returnVoteChangeContainer = function () {
    if (submit % 2 === 0) {
      if (hasUserVoted) {
        return (
          <div>
            <div style={{ fontSize: "25px" }}>You have already voted</div>
            <div class="already-voted-border"></div>
          </div>
        )
      } else {
        return (
          <div class={showDiv}>
            <div class="vote-change-container">
              <div class="vote-input">
                <div class="your-vote">Your vote: </div>
              </div>
              <div class="new-border">
                <div class="full-vote">
                  <div class="number" style={{ fontSize: "30px" }}>{inputValue}</div>
                  <div class="outline">
                    <div style={{ fontSize: "30px" }}>/</div>
                    <div style={{ fontSize: "30px" }}>10</div>
                    <button class="plus" onClick={() => increaseInputValue()}>+</button>
                    <button class="minus" onClick={() => decreaseInputValue()}>-</button>
                  </div>
                </div>
              </div>
              <div class="check" onClick={() => sendVoteObj()}>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
            <div class="post-divider"></div>
          </div>
        )
      }
    } else {
      return;
    }
  }

  const returnScore = function () {
    return (
      <div class="score">
        <div class="score-number" >{averageState} / 10</div>
      </div>
    )
  }

  const callSetShowDiv = function () {
    setShowDiv("vote-div-show");
    setSubmit(submit + 1);
  }

  const increaseColorState = function () {
    setColorState(colorState + 1);
  }

  const readColorState = function () {
    const username = localStorage.getItem("username");
    if (colorState % 2 === 0) {
      increaseColorState();
      Axios.post(`/api/users/${id}`, {
        add: true,
        postId: postId,
        username: username,
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error(error))
      ////
      setPostLikes(postLikes + 1);
      Axios.post(`/api/posts/${id}`, {
        like: true,
        plus: true
      })
    } else {
      increaseColorState();
      Axios.post(`/api/users/${id}`, {
        add: false,
        postId: postId,
        username: username
      })
        .then(result => {
          console.log(result);
        })
        .catch(error => console.error(error))
      ////
      setPostLikes(postLikes - 1);
      Axios.post(`/api/posts/${id}`, {
        like: true,
        plus: false
      })
    }
  }

  const changeCommentState = function (e) {
    setResponseState(e.target.value);
  }

  const postReply = function () {
    const username = localStorage.getItem("username");
    if (responseState === '') {
      setPlaceHolderState("Reply field cannot be left empty...");
      return;
    } else {
      setLoadingState(true);
      setTimeout(() => {
        setLoadingState(false);
      }, 800);
      window.location.reload();
      Axios.post(`/api/replies`, {
        postId,
        username,
        reply: responseState,
        replying: true,
        originalId: JSON.parse(localStorage.getItem("id"))
      })
        .then(() => changeNavigation(`/home/${id}`))
    }
  }

  const readReplyState = function () {
    if (openReply % 2 !== 0) {
      return (
        <div>
          <textarea class="reply-textarea" placeholder={placeHolderState} onChange={(e) => changeCommentState(e)}>

          </textarea>
          <button class="post-reply" onClick={() => postReply()}><FontAwesomeIcon icon={faCheck} /></button>
        </div>
      );
    } else {
      return;
    }
  }

  const changeReplyLikes = function (objectId, index) {
    const username = localStorage.getItem("username");
    if (replyLikes[index] % 2 === 0) {
      addRepliesState(objectId);
      addReplyLikes(index);
      Axios.post('/api/replies', {
        objectId,
        like: true,
        isReplyLike: true,
        username
      })
        .then(() => console.log("request sent!"))
        .catch(() => console.log("request failed"))
    } else {
      subtractRepliesState(objectId);
      subtractReplyLikes(index);
      Axios.post('/api/replies', {
        objectId,
        like: false,
        isReplyLike: true,
        username
      })
        .then(() => console.log("request sent!"))
        .catch(() => console.log("request failed"))
    }
  }

  const addRepliesState = function (objectId) {
    const correctObj = repliesState.find((obj) => obj.id === objectId);
    const correctIndex = repliesState.indexOf(correctObj);
    const newArray = [
      ...repliesState,
    ]
    newArray[correctIndex].likes = newArray[correctIndex].likes + 1;
    setRepliesState(newArray);
  }

  const subtractRepliesState = function (objectId) {
    const correctObj = repliesState.find((obj) => obj.id === objectId);
    const correctIndex = repliesState.indexOf(correctObj);
    const newArray = [
      ...repliesState,
    ]
    newArray[correctIndex].likes = newArray[correctIndex].likes - 1;
    setRepliesState(newArray);
  }

  const addReplyLikes = function (index) {
    const newReplyLikesArray = [...replyLikes];
    newReplyLikesArray[index] += 1;
    setReplyLikes(newReplyLikesArray);
  }

  const subtractReplyLikes = function (index) {
    const newReplyLikesArray = [...replyLikes];
    newReplyLikesArray[index] -= 1;
    setReplyLikes(newReplyLikesArray);
  }

  const returnRepliesState = function () {
    const data = repliesState.map((obj, index) => (
      <div class="reply-comment">
        <div class="reply-username">
          <div>@ {obj.username}</div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "25px", color: "grey"}} onClick={() => changeNavigation(`/home/${id}/replies/${obj.id}`)}><FontAwesomeIcon icon={faComment} /></div>
            <div style={{ marginRight: "5px", cursor: "pointer" }}>
              <div onClick={() => changeReplyLikes(obj.id, index)} style={{ color: replyLikes[index] % 2 === 0 ? "grey" : "rgb(230, 183, 62)" }}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
            <div style={{ color: "grey" }}>{obj.likes}</div>
          </div>
        </div>
        <div>{obj.reply}</div>
      </div>
    ))
    if (repliesState.length === 0) {
      return (
        <div class="zero-replies" >no replies yet :(</div>
      )
    } else {
      return (
        <div class="replies-data">
          {data}
        </div>
      )
    }
  }

  const returnCorrectState = function () {
    if (loadingState) {
      return (
        circle
      )
    } else {
      return (
        <div>
          <div class="single-post-page">
            <div style={{ color: "white" }} class="single-post-div">
              <div class="title-post-div">
                <div>
                  <h1 class="post-title" onClick={() => console.log(replyLikes)}>{postPageState.title}<div style={{ color: "rgb(120, 120, 120)", fontSize: "20px", marginTop: "5px", fontWeight: "300" }}>@ {postPageState.username}</div></h1>
                  <div style={{ width: "450px" }} class="post-divider"></div>
                  <div class="score-votes">
                    {returnScore()}
                    <div class="ele">{voteState} votes</div>
                  </div>
                </div>
                <div class="vote-full-container">
                  <div class="vote" onClick={() => callSetShowDiv()}><FontAwesomeIcon icon={faCheckToSlot} /></div>
                  <div class={isClicked()} onClick={() => readColorState()}>{<FontAwesomeIcon icon={faHeart} />}</div>
                </div>
                <div class="submit-vote-div" style={{ display: isSubmit ? "flex" : "none" }}>
                  <div class="submit-show">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div class="submit-show-text">
                    Vote submitted successfully
                  </div>
                </div>
              </div>
              <div class="post-divider"></div>
              <div class="vote-change-hide">{returnVoteChangeContainer()}</div>
              <div>{postPageState.take}</div>
              <div style={{ height: "25px" }}></div>
            </div>
          </div>
          <div class="reply-div">
            <div class="inner-div">
              <button class="reply" onClick={() => setOpenReply(openReply + 1)}>Add a reply</button>
              <div>{readReplyState()}</div>
            </div>
          </div>
          <div class="replies-container">
            <div class="show-replies">{returnRepliesState()}</div>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <div>{header}</div>
      <div>{returnCorrectState()}</div>
    </div>
  )
}