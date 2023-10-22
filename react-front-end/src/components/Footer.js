import React, { useState } from "react";
import image2 from "../images/image2.png";

export default function Footer() {

  const [showState, setShowState] = useState(0);
  const [showRulesState, setShowRulesState] = useState(0);

  //show state based on user clicks

  function readShowState() {
    const none = "none";
    const block = "flex";

    if (showState % 2 === 0) {
      return none;
    } else {
      return block;
    }
  }

  const readShowRulesState = function () {
    const none = "none";
    const block = "flex";

    if (showRulesState % 2 === 0) {
      return none;
    } else {
      return block;
    }
  }

  // maintain proper state management

  const setDivDisplay = function (firstState, nextState, originalState) {
    firstState(0);
    nextState(originalState + 1);
  }

  return (
    <div class="main-footer">
      <div style={{ width: "100%" }}>
        <div class="about-the-creator-div" style={{ display: readShowState() }}>
          <div style={{ width: "50%", display: "flex", justifyContent: "center" }}>
            <div style={{ height: "100%", marginTop: "50px", marginLeft: "135px" }}>
              <img src={image2} height="337px" width="150px" class="image"></img>
            </div>
          </div>
          <div style={{ width: "50%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "75%", marginTop: "25px", marginRight: "175px" }}>
              <p>
                My name is Luke and I'm a full-stack web developer based in Calgary, Canada. My journey into the tech industry commenced in my formative years, exploring computer animation and graphic design. Over time, my fascination with programming grew, drawn to its inherent logic and problem-solving facets. This prompted my decision to transition my passion for technology into a professional career.
                I completed a comprehensive web development program at Lighthouse Labs, where I honed my skills and developed an assortment of projects highlighting my capabilities. With a strong command of JavaScript, I specialize in React.js and Express.js, complemented by a proficient understanding of front-end languages like HTML, CSS, and jQuery. My expertise extends to SQL for efficient database management, and I'm well-versed in various front-end frameworks such as Next.js and Vue.js.
                My latest project, constructed entirely using React and Express, relies on SQL for database administration. This initiative reflects my enthusiasm for sports. For more details and limitations on this project, please refer to the README.md file linked below. <br /><br />
                <a class="my-links" rel="noopener noreferrer" href="https://github.com/lukechamberland/sports-app/blob/master/README.md" target="_blank">README</a>
                <br /><br />
                <a class="my-links" rel="noopener noreferrer" href="https://github.com/lukechamberland?tab=repositories" target="_blank">Github</a>
                <br /><br />
                <a class="my-links" rel="noopener noreferrer" href="https://www.linkedin.com/in/luke-chamberland-755aab280/" target="_blank">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
        <div class="rules-div" style={{ display: readShowRulesState() }}>
          Stay on Topic: Opinions and discussions should be relevant to the sports-related topics provided. Off-topic content may be subject to removal.
          <br /><br />
          Respectful Discussions: Encourage users to engage in respectful, constructive, and insightful conversations. Disagreement is acceptable, but personal attacks or disrespectful behavior will not be tolerated.
          <br /><br />
          No Bullying, Discrimination, or Harassment: Users should refrain from any form of bullying, discrimination, or harassment based on race, gender, sexual orientation, religion, or any other personal characteristic. Treat everyone with respect and kindness.
          <br /><br />
          Factual Accuracy: Encourage users to provide accurate information or support their hot takes with credible sources when necessary. Misinformation should be corrected, and sources, when available, should be cited.
          <br /><br />
          Moderation of Language: Profanity or offensive language should be kept to a minimum, and any explicit content is strictly prohibited.
          <br /><br />
          No Spamming or Solicitation: Users should refrain from spamming or repeatedly posting the same content. Avoid solicitation or excessive self-promotion.
          <br /><br />
          Respect Privacy: Do not share personal information, including but not limited to addresses, phone numbers, or any other private details. Respect the privacy of others.
          <br /><br />
          Reporting and Moderation: Encourage users to report any content that violates the community guidelines. Ensure active moderation to address reported issues promptly.
          <br /><br />
          User Accountability: Users are responsible for their own actions and content they post. Any violations of the guidelines could result in warnings, content removal, or account suspension.
        </div>
        <div class="footer">
          <div class="footer-div" onClick={() => setDivDisplay(setShowState, setShowRulesState, showRulesState)}>Rules</div>
          <div class="footer-div" onClick={() => setDivDisplay(setShowRulesState, setShowState, showState)}>About the creator</div>
        </div>
      </div>
    </div>
  )
}