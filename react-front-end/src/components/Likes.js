import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "../icons";
import Header from "./Header";
import Axios from "axios";
import Circle from "./Circle";

export default function Likes() {

  const navigate = useNavigate();

  const [userObj, setUserObj] = useState([]);

  const [likesArray, setLikesArray] = useState([]);

  const [likedPosts, setLikedPosts] = useState([]);

  const [evenLikedPosts, setEvenLikedPosts] = useState([]);

  const [oddLikedPosts, setOddLikedPosts] = useState([]);

  const [firstState, setFirstState] = useState(false);

  useEffect(() => {
    Promise.all([
      Axios.get("/api/users"),
      Axios.get("/api/posts")
    ])
      .then(([users, posts]) => {
        const username = localStorage.getItem("username");
        const correctObj = users.data.find((obj) => obj.username === username);
        setLikesArray(correctObj.likes);
        const correctLikesArray = posts.data.filter((obj) => correctObj.likes.includes(obj.id));
        setLikedPosts(correctLikesArray);
        correctLikesArray.reverse();
        const oddArray = [];
        const evenArray = [];
        for (let ele of correctLikesArray) {
          if (correctLikesArray.indexOf(ele) % 2 !== 0) {
            oddArray.push(ele);
          } else {
            evenArray.push(ele);
          }
        }

        setEvenLikedPosts(evenArray);
        setOddLikedPosts(oddArray);

        setTimeout(() => {
          setFirstState(true);
        }, 400);
      })
  }, []);

  console.log(evenLikedPosts, oddLikedPosts)

  const changeNav = function (route) {
    navigate(route);
  }

  const reduceTake = function (take) {
    const newArray = [];
    const newTake = take.split('');
    for (let i = 0; i < 100; i++) {
      newArray.push(newTake[i]);
    }
    return newArray.join('');
  }

  const returnEvenLikedPosts = function () {
    return evenLikedPosts.map((ele) => (
      <div class="likes-ele" onClick={() => changeNav(`/home/${ele.id}`)}>
        <div class="title-likes-container">
          <div class="likes-div-title">{ele.title}</div>
          <div class="number-of-likes"><FontAwesomeIcon icon={faHeart} /> {ele.likes}</div>
        </div>
        <div class="likes-div-username">{ele.username}</div>
        <div class="likes-div-take">{reduceTake(ele.take)}...</div>
      </div>
    ))
  }

  const returnOddLikedPosts = function () {
    return oddLikedPosts.map((ele) => (
      <div class="likes-ele" onClick={() => changeNav(`/home/${ele.id}`)}>
        <div class="title-likes-container">
          <div class="likes-div-title">{ele.title}</div>
          <div class="number-of-likes"><FontAwesomeIcon icon={faHeart} /> {ele.likes}</div>
        </div>
        <div class="likes-div-username">{ele.username}</div>
        <div class="likes-div-take">{reduceTake(ele.take)}...</div>
      </div>
    ))
  }

  const returnState = function () {
    if (firstState) {
      if (likesArray.length === 0) {
        return (
          <div>
             <div><Header /></div>
             <div class="likes-heart" style={{ marginTop: "200px", display: "flex", justifyContent: "center" }}>{<FontAwesomeIcon icon={faHeart} />}</div>
             <h1 class="no-liked-posts">No liked posts yet :(</h1>
          </div>
        )
      } else {
        return (
          <div>
            <div>{<Header />}</div>
            <div>
              <div class="likes-heart-container">
                <div class="likes-heart">{<FontAwesomeIcon icon={faHeart} />}</div>
              </div>
              <div class="like-post-container">
                <div class="even-numbered-posts">
                  {returnEvenLikedPosts()}
                </div>
                <div class="odd-numbered-posts">
                  {returnOddLikedPosts()}
                </div>
              </div>
            </div>
          </div>
        )
      }
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