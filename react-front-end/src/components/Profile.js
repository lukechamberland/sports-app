import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "../icons";
import Axios from "axios";
import Circle from "./Circle";

export default function Profile() {

  const [fullObjectState, setFullObjectState] = useState({});
  const [circleState, setCircleState] = useState(0);
  const [editState, setEditState] = useState("first name");
  const [postState, setPostState] = useState("firstname");
  const [updatedState, setUpdatedState] = useState("");
  const [allEmailsState, setAllEmailsState] = useState([]);
  const [allUsernamesState, setAllUsernamesState] = useState([]);

  useEffect(() => {
    Axios.get("/api/users").then(array => {
      const username = localStorage.getItem("username");
      const correctObj = array.data.find((obj) => obj.username === username);
      setFullObjectState(correctObj);
      const emails = [];
      const usernames = [];
      for (let obj of array.data) {
        if (!emails.includes(obj.emails)) {
          emails.push(obj.email);
        }
        if (!usernames.includes(obj.username)) {
          usernames.push(obj.username);
        }
      }
      setAllUsernamesState(usernames);
      setAllEmailsState(emails);
    })

    setTimeout(() => {
      setCircleState(1);
    }, 1000);

  }, []);

  const checkEmail = function (email) {
    if (allEmailsState.includes(email)) {
      return false;
    } else {
      return true;
    }
  }

  const checkUsername = function (username) {
    if (allUsernamesState.includes(username)) {
      return false;
    } else {
      return true;
    }
  }

  const changeEditState = function (state, newPostState) {
    setCircleState(0);
    setTimeout(() => {
      setCircleState(2);
    }, 500);
    setEditState(state);
    setPostState(newPostState);
  }

  const changeUpdatedState = function (e) {
    const text = e.target.value;
    setUpdatedState(text);
  }

  const limitCharacters = function (text) {
    const splitText = text.split("");
    const newText = [];
    for (let i = 0; i < 15; i++) {
      newText.push(splitText[i]);
    }

    const finalText = newText.join("");

    if (text.length > 15) {
      return finalText + "...";
    } else {
      return text;
    }
  }

  const sendRequest = function (state1, state2) {

    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (state1 === "email") {
      if (!checkEmail(state2)) {
        alert("This email already exists, please use a unique email.");
        return;
      }
    }

    if (state1 === "username") {
      if (!checkUsername(state2)) {
        alert("This username already exists, please use a unique username.");
        return;
      } else {
        localStorage.setItem("username", state2);
        Axios.post("/api/posts", {
          change: true,
          newUsername: state2,
          userId: JSON.parse(userId)
        });
        Axios.post("/api/replies", {
          change: true,
          newUsername: state2,
          userId: userId
        });
      }
    }

    if (state1 === "firstname") {
      localStorage.setItem("name", state2);
    }

    Axios.post("/api/users", {
      change: true,
      username,
      originalState: state1,
      newState: state2
    });

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  const returnProperState = function () {
    if (circleState === 0) {
      return (
        <div>
          <div>{<Header />}</div>
          <div>{<Circle />}</div>
        </div>
      )
    } else if (circleState === 1) {
      return (
        <div>
          <div>
            <div>{<Header />}</div>
            <div style={{ marginTop: "150px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ color: "rgb(230, 183, 62)", fontSize: "100px" }}><FontAwesomeIcon icon={faUser} /></div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <div style={{ width: "200px", textAlign: "right" }}>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>First name:</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>Last name:</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>Email:</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>Password:</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>Username:</div>
              </div>
              <div style={{ width: "200px", marginLeft: "20px" }}>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{limitCharacters(fullObjectState.firstname)}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{limitCharacters(fullObjectState.lastname)}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{limitCharacters(fullObjectState.email)}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{limitCharacters(fullObjectState.password)}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{limitCharacters(fullObjectState.username)}</div>
              </div>
              <div>
                <div style={{ color: "white", marginBottom: "10px", fontSize: "20px" }}><button class="profile-edit-button" onClick={() => changeEditState("first name", "firstname")}>edit</button></div>
                <div style={{ color: "white", marginBottom: "10px", fontSize: "20px" }}><button class="profile-edit-button" onClick={() => changeEditState("last name", "lastname")}>edit</button></div>
                <div style={{ color: "white", marginBottom: "10px", fontSize: "20px" }}><button class="profile-edit-button" onClick={() => changeEditState("email", "email")}>edit</button></div>
                <div style={{ color: "white", marginBottom: "10px", fontSize: "20px" }}><button class="profile-edit-button" onClick={() => changeEditState("password", "password")}>edit</button></div>
                <div style={{ color: "white", marginBottom: "10px", fontSize: "20px" }}><button class="profile-edit-button" onClick={() => changeEditState("username", "username")}>edit</button></div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>{<Header />}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginTop: "300px" }}>
              <div style={{ color: "white", fontSize: "20px" }}>New {editState}:</div>
              <input class="profile-change-input" onChange={(e) => changeUpdatedState(e)} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button class="profile-edit-submit-button" onClick={() => sendRequest(postState, updatedState)}>submit</button>
          </div>
        </div>
      )
    }
  }
  return (
    <div>{returnProperState()}</div>
  )
}