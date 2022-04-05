import { useState } from "react";
import classes from "../../styles/ContactMe.module.scss";
import Button from "../UI/Button";
// import { FormEvent } from "react";
import FaceBookIcon from "../../images/Facebook_icon.png";

import LinkedinIcon from "../../images/linkedin.png";
import GithubIcon from "../../images/github.svg";

import BirdImage from "../../images/bird-1.gif";
import axios from "axios";

const ContactMe = () => {
  const initialFormState = {
    email: "",
    name: "",
    message: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState();

  const formId = "tXX2I3wm";

  const formSparkUrl = `https://submit-form.com/${formId}`;

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    await postSubmission();
    setSubmitting(false);
    setFormState(initialFormState);
  };

  const postSubmission = async () => {
    const payload = {
      ...formState,
    };

    try {
      const result = await axios.post(formSparkUrl, payload);
      console.log(result);
      setMessage("Thanks, I'll get in touch shortly.");
    } catch (error) {
      console.log(error);
    }
  };

  const updateFormControl = (event) => {
    setMessage("");
    const { id, value } = event.target;
    const formKey = id;
    const updatedFormState = { ...formState };
    updatedFormState[formKey] = value;
    setFormState(updatedFormState);
  };
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

        <form
          className={classes["section-container--2"]}
          onSubmit={submitFormHandler}
        >
          {message && (
            <p className="section-container--2--message">{message}</p>
          )}
          <input
            onChange={updateFormControl}
            value={formState.name}
            id="name"
            type="text"
            placeholder="Your name"
            required
          />

          <input
            onChange={updateFormControl}
            value={formState.email}
            id="email"
            type="email"
            placeholder="Email"
            required
          />

          <textarea
            onChange={updateFormControl}
            value={formState.message}
            id="message"
            placeholder="Your message"
            required
          />
          <div className={classes["section-container--2--btn"]}>
            <button>{submitting ? "<Sending.../>" : "<Send/>"}</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
