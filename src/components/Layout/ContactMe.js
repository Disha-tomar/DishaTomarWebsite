import classes from "../../styles/ContactMe.module.scss";
import Button from "../UI/Button";

import FaceBookIcon from "../../images/Facebook_icon.png";

import LinkedinIcon from "../../images/linkedin.png";
import GithubIcon from "../../images/github.svg";

import BirdImage from "../../images/bird-1.gif";

const ContactMe = () => {
  return (
    <section id="contact" className={classes["section-contact"]}>
      <div className={classes["section-container"]}>
        <div className={classes["section-container--1"]}>
          {" "}
          <h3 className={classes["section-heading-primary"]}>
            {" "}
            Get in touch!
            {/* <span>👋 </span> */}
          </h3>{" "}
          <img
            className={classes["section-container--1-bird"]}
            src={BirdImage}
            alt="bird"
          />
          <h2>Disha Tomar</h2>
          <h5>
            {/* <span>&#128231;</span> */}
            dishatomariitkgp@gmail.com
          </h5>
          <div className={classes["section-container--1-icons"]}>
            <a
              href="https://www.linkedin.com/in/disha-tomar-714541100/"
              target="_blank"
            >
              <img src={LinkedinIcon} alt="icon" />
            </a>
            <a href="https://github.com/Disha-tomar" target="_blank">
              <img src={GithubIcon} alt="icon" />
            </a>
            <a href="https://www.facebook.com/disha.tomar" target="_blank">
              <img src={FaceBookIcon} alt="icon" />
            </a>
          </div>
        </div>

        <form className={classes["section-container--2"]}>
          <input type="text" placeholder="Your name" name="name" required />

          <input type="email" placeholder="Email" name="email" required />

          <textarea placeholder="Your message" name="message" required />
          <div className={classes["section-container--2--btn"]}>
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
