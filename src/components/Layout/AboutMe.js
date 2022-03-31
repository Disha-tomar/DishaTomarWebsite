import { useEffect } from "react";
import Button from "../UI/Button";

import classes from "../../styles/AboutMe.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";

import Disha from "../../images/disha.JPG";

import ReactIcon from "../../images/react.png";
import ReduxIcon from "../../images/redux.svg";
import JavascriptIcon from "../../images/javascript.png";
import SassIcon from "../../images/sass.svg";
import GitIcon from "../../images/Git.svg.png";
import GitHubIcon from "../../images/github.svg";
import FirebaseIcon from "../../images/firebase.png";
import PhotoshopIcon from "../../images/photoshop.png";

const AboutMe = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease",
      once: true,
    });
  });

  return (
    <section id="about" className={classes["section-about"]}>
      <div className={classes["section-container"]}>
        <img className={classes["section-pic"]} src={Disha} alt="disha"></img>
        <h3 className={classes["section-heading-primary"]}>Hello!</h3>
        <div>
          <p className={classes["section-description"]}>
            I'm an Architect and a Town Planner, recently discovered passion for
            programming.
          </p>
          <p className={classes["section-description"]}>
            It all started during the lockdown in april 2021 when I developed a
            passion for coding. I've learnt Python, HTML, CSS and Javascript
            during this time. I plan to master all the skills that require to
            become a full stack web developer!
          </p>
          <div className={classes["section-btn"]}>
            <Button>See my projects</Button>
          </div>
        </div>
        <h3 className={classes["section-heading-secondary"]}>My Tech Skills</h3>

        <div className={classes["section-skills"]}>
          <img
            className={classes["section-skills-image"]}
            src={ReactIcon}
            alt="reactIcon"
          ></img>

          <img
            className={classes["section-skills-image"]}
            src={ReduxIcon}
            alt="reduxIcon"
          ></img>

          <img
            className={classes["section-skills-image"]}
            src={JavascriptIcon}
            alt="javascriptIcon"
          ></img>
          <img
            className={classes["section-skills-image"]}
            src={SassIcon}
            alt="sassIcon"
          ></img>
          <img
            className={classes["section-skills-image"]}
            src={GitIcon}
            alt="gitIcon"
          ></img>
          <img
            className={classes["section-skills-image"]}
            src={GitHubIcon}
            alt="githubIcon"
          ></img>
          <img
            className={classes["section-skills-image-7"]}
            src={FirebaseIcon}
            alt="firebaseIcon"
          ></img>
          <img
            className={classes["section-skills-image"]}
            src={PhotoshopIcon}
            alt="photoshopIcon"
          ></img>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
