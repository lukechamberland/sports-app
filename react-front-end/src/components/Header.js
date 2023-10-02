import React from "react";
import { faUser } from "../icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "../icons";
import { faBars } from "../icons";

export default function Header() {
  return (
    <div class="header">
      <div class="left-side-header">
        <div class="user">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
      <div class="right-side-header">
        <div class="header-heart">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div class="bars">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  )
}