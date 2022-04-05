import { DirectionsSubway } from "@mui/icons-material";
import ProjectItem from "./ProjectItem";
import classes from "../../styles/ProjectList.module.scss";
import MyDiaryImage from "../../images/mydiary.png";
import NatoursImage from "../../images/natours.png";

import ReactIcon from "../../images/react.png";
import ReduxIcon from "../../images/redux.svg";

import HTMLIcon from "../../images/html5.jpg";
import CssIcon from "../../images/css.png";
import JavascriptIcon from "../../images/javascript.png";
import SassIcon from "../../images/sass.svg";

import JokesImage from "../../images/jokes.png";

const ProjectList = () => {
  const projectItem = [
    {
      id: 1,
      title: "My Diary",
      link: "https://my-diary-phi.vercel.app/",
      image: MyDiaryImage,
      technologies: [
        { pic: ReactIcon, caption: "React" },
        { pic: ReduxIcon, caption: "Redux" },
        { pic: SassIcon, caption: "Sass" },
      ],
      description:
        "It is a CRUD (Create Read Update Delete) application using ReactJs and Redux Toolkit(to manage my app wide state). User can add, edit and delete diary entries. Used redux-persist npm package to save all the entries in the local storage of the user's browser. I've used CSS Modules for styling the app.",
    },

    {
      id: 2,
      title: "Jokes App",
      link: "https://disha-tomar.github.io/jokes/",
      image: JokesImage,
      technologies: [
        { pic: JavascriptIcon, caption: "Javascript" },
        { pic: HTMLIcon, caption: "HTML5" },
        { pic: CssIcon, caption: "CSS" },
      ],
      description:
        'It is a simple Web application using vanilla JavaScript . It displays random jokes fetched from the API - "https://sv443.net/jokeapi/v2/". Users have an option to filter/blacklist jokes of certain categories as per choice.',
    },
    {
      id: 3,
      title: "Natours - Tour booking Web App",
      link: "https://natours-ten-tan.vercel.app/",
      image: NatoursImage,
      technologies: [
        { pic: CssIcon, caption: "CSS" },
        { pic: HTMLIcon, caption: "HTML5" },
      ],
      description:
        "It is a Dummy tour booking web application developed as a part of an online CSS course. Used Sass and applied advanced concepts such as variables, mixins, responsive design principles, media queries, graceful degradation using @supports, etc.",
    },
  ];
  return (
    <section className={classes["section-container"]}>
      <h2 id="projects" className={classes["section-heading-primary"]}>
        My Projects
      </h2>
      <div className={classes["section-project"]}>
        {projectItem.map((item) => (
          <div className={classes["section-project-item"]}>
            <ProjectItem
              key={item.id}
              id={item.id}
              technologies={item.technologies}
              title={item.title}
              link={item.link}
              image={item.image}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
