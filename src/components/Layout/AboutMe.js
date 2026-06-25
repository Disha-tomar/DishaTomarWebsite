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
import FastApi from "../../images/fastapi.svg";
import Postgresql from "../../images/postgresql.svg";
import Docker from "../../images/docker.svg";
import Claude from "../../images/claude.svg";
import Cursor from "../../images/cursor.svg";
import Kafka from "../../images/kafka.svg";
import D3 from "../../images/d3.svg";
import Tailwind from "../../images/tailwind.svg";
import MaterialUi from "../../images/material-ui.svg";

const skillGroups = [
  {
    title: "Frontend & UI",
    items: [
      { caption: "ReactJs", pic: ReactIcon },
      { caption: "Angular", pic: Angular },
      { caption: "Redux", pic: ReduxIcon },
      { caption: "Nextjs", pic: Nextjs },
      { caption: "JavaScript", pic: JavascriptIcon },
      { caption: "TypeScript", pic: Typescript },
      { caption: "HTML", pic: Html5 },
      { caption: "CSS", pic: Css3 },
      { caption: "Sass", pic: SassIcon },
      { caption: "Tailwind", pic: Tailwind },
      { caption: "Material UI", pic: MaterialUi },
      { caption: "D3.js", pic: D3 },
      { caption: "Handlebars", pic: Handlebars },
      { caption: "Electron", pic: Electron },
    ],
  },
  {
    title: "Backend, Data & AI",
    items: [
      { caption: "Node.js", pic: Nodejs },
      { caption: "Python", pic: Python },
      { caption: "FastAPI", pic: FastApi },
      { caption: "PostgreSQL", pic: Postgresql },
      { caption: "MongoDb", pic: MongoDb },
      { caption: "Kafka", pic: Kafka },
      { caption: "Claude / LLM", pic: Claude },
      { caption: "Cursor", pic: Cursor },
    ],
  },
  {
    title: "DevOps & Tooling",
    items: [
      { caption: "AWS", pic: Aws },
      { caption: "Docker", pic: Docker },
      { caption: "Git", pic: GitIcon },
      { caption: "GitHub", pic: GitHubIcon },
      { caption: "Webpack", pic: Webpack },
      { caption: "NPM", pic: Npm },
      { caption: "Postman", pic: Postman },
    ],
  },
];

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
            I'm an AI Engineer and Full Stack Developer with 4+ years of turning vague ideas and messy spreadsheets into software people actually enjoy using. Right now I'm a Senior Software Engineer at Alucor in Dubai, where I'm essentially a one woman delivery pipeline: architecture, infrastructure, the database, the API, and the pixels you click, all the way down.
          </p>
          <p className={classes["section-description"]}>
            I started out in the frontend, including a few years at Korn Ferry, then slowly fell down the backend and AI rabbit hole, so these days I happily own the whole stack. I care a little too much about clean design, thoughtful UX, and code that doesn't wake me up at 2am. And yes, I build with AI as much as I build AI: Claude Code, Cursor and the Claude API are basically my pair programmers.
          </p>
          <div className={classes["section-btn"]}>
            <Link to="projects" spy={true} smooth={true}>
              <Button>See my projects</Button>
            </Link>
          </div>
        </div>
        <h3 className={classes["section-heading-secondary"]}>My Tech Skills</h3>

        {skillGroups.map((group) => (
          <div className={classes["section-skill-group"]} key={group.title}>
            <h4 className={classes["section-skill-group-title"]}>
              {group.title}
            </h4>
            <div className={classes["section-skills"]}>
              {group.items.map((item) => (
                <div
                  className={classes["section-skills-item"]}
                  key={item.caption}
                >
                  <h5 className={classes["section-skills-caption"]}>
                    {item.caption}
                  </h5>
                  <img
                    className={classes["section-skills-image"]}
                    src={item.pic}
                    alt={item.caption}
                  ></img>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutMe;
