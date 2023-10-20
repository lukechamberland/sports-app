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

  useEffect(() => {
    Axios.get("/api/users").then(array => {
      const username = localStorage.getItem("username");
      const correctObj = array.data.find((obj) => obj.username === username);
      setFullObjectState(correctObj);
    })

    setTimeout(() => {
      setCircleState(1);
    }, 1000);

  }, []);

  const changeEditState = function(state, newPostState) {
    setCircleState(0);
    setTimeout(() => {
      setCircleState(2);
    }, 500)
    setEditState(state);
    setPostState(newPostState);
  }

  const changeUpdatedState = function(e) {
    const text = e.target.value;
    setUpdatedState(text);
  }

  const sendRequest = function(username, firstState, secondState) {
    if (firstState === "username") {
      localStorage.setItem("username", secondState);
    }
    window.location.reload();
    Axios.post("/api/users", {
      change: true,
      username: username,
      originalState: firstState,
      newState: secondState
    })
  }

  const returnProperState = function () {
    if (circleState === 0) {
      return (
        <div>{<Circle />}</div>
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
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{fullObjectState.firstname}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{fullObjectState.lastname}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{fullObjectState.email}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{fullObjectState.password}</div>
                <div style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>{fullObjectState.username}</div>
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
            <button class="profile-edit-submit-button" onClick={() => sendRequest(localStorage.getItem("username"), postState, updatedState)}>submit</button>
          </div>
        </div>
      )
    }
  }
  return (
    <div>{returnProperState()}</div>
  )
}