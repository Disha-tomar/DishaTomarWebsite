import { useEffect } from "react";
import Button from "../UI/Button";
import { Link } from "react-scroll";

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
import Angular from "../../images/angular.png";
import Nextjs from "../../images/nextjs.png";
import Nodejs from "../../images/nodejs.png";
import Typescript from "../../images/typescript.png";
import Python from "../../images/python.png";
import Electron from "../../images/electron.png";
import MongoDb from "../../images/mongodb.png";
import Webpack from "../../images/webpack.png";

import Npm from "../../images/npm.png";
import Aws from "../../images/aws.png";
import Css3 from "../../images/css3.png";
import Html5 from "../../images/html5.png";
import Handlebars from "../../images/handlebars.png";
import Postman from "../../images/postman.png";

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
        {/* <img src={Hello} alt="hello" /> */}
        <h3 className={classes["section-heading-primary"]}>Hello!</h3>
        <div>
          <p className={classes["section-description"]}>
            I'm a professional Software Developer with 3+ years of Experience, currently building scalable, user-centric applications at Korn Ferry.
          </p>
          <p className={classes["section-description"]}>
            Over the past few years, I've built responsive, accessible, and scalable web and desktop applications using JavaScript, React, Angular, Nextjs and more. I'm driven by clean design, thoughtful UX, and solving real-world problems through code.
          </p>
          <div className={classes["section-btn"]}>
            <Link to="projects" spy={true} smooth={true}>
              <Button>See my projects</Button>
            </Link>
          </div>
        </div>
        <h3 className={classes["section-heading-secondary"]}>My Tech Skills</h3>

        <div className={classes["section-skills"]}>
          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>ReactJs</h5>
            <img
              className={classes["section-skills-image"]}
              src={ReactIcon}
              alt="reactIcon"
            ></img>
          </div>
            <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Angular</h5>
            <img
              className={classes["section-skills-image"]}
              src={Angular}
              alt="Angular"
            ></img>
          </div>
          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Redux</h5>
            <img
              className={classes["section-skills-image"]}
              src={ReduxIcon}
              alt="reduxIcon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Nextjs</h5>
            <img
              className={classes["section-skills-image"]}
              src={Nextjs}
              alt="Nextjs"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>JavaScript</h5>
            <img
              className={classes["section-skills-image"]}
              src={JavascriptIcon}
              alt="javascript-Icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>TypeScript</h5>
            <img
              className={classes["section-skills-image"]}
              src={Typescript}
              alt="typescript-Icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Node.js</h5>
            <img
              className={classes["section-skills-image"]}
              src={Nodejs}
              alt="nodejs-Icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Sass</h5>
            <img
              className={classes["section-skills-image"]}
              src={SassIcon}
              alt="sass-Icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Python</h5>
            <img
              className={classes["section-skills-image"]}
              src={Python}
              alt="python-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Webpack</h5>
            <img
              className={classes["section-skills-image"]}
              src={Webpack}
              alt="Webpack-ion"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>MongoDb</h5>
            <img
              className={classes["section-skills-image"]}
              src={MongoDb}
              alt="mongoDb-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Electron</h5>
            <img
              className={classes["section-skills-image"]}
              src={Electron}
              alt="electron-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Git</h5>
            <img
              className={classes["section-skills-image"]}
              src={GitIcon}
              alt="gitIcon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>GitHub</h5>
            <img
              className={classes["section-skills-image"]}
              src={GitHubIcon}
              alt="githubIcon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>HTML</h5>
            <img
              className={classes["section-skills-image"]}
              src={Html5}
              alt="html-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>CSS</h5>
            <img
              className={classes["section-skills-image"]}
              src={Css3}
              alt="css-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>NPM</h5>
            <img
              className={classes["section-skills-image"]}
              src={Npm}
              alt="npm-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>AWS</h5>
            <img
              className={classes["section-skills-image"]}
              src={Aws}
              alt="aws-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Postman</h5>
            <img
              className={classes["section-skills-image"]}
              src={Postman}
              alt="postman-icon"
            ></img>
          </div>

          <div className={classes["section-skills-item"]}>
            <h5 className={classes["section-skills-caption"]}>Handlebars</h5>
            <img
              className={classes["section-skills-image"]}
              src={Handlebars}
              alt="handlebars-icon"
            ></img>
          </div>




        </div>
      </div>
    </section>
  );
};

export default AboutMe;
