import classes from "../../styles/ProjectItem.module.scss";

const ProjectItem = (props) => {
  return (
    <div className={classes["project-item"]}>
      <a href={props.link} target="-blank">
        <img
          className={classes["project-image"]}
          src={props.image}
          alt="project"
        ></img>
      </a>

      <div className={classes["project-detail"]}>
        <h3 className={classes["project-detail-heading-primary"]}>
          {props.title}
        </h3>
        <a
          href={props.link}
          target="_blank"
          className={classes["project-detail-heading-tertiary"]}
        >
          {props.link}
        </a>
        <p className={classes["project-detail-description"]}>
          {props.description}
        </p>
        <h4 className={classes["project-detail-heading-secondary"]}>
          Technologies used
        </h4>

        {props.technologies && (
          <div className={classes["project-detail-tech-container"]}>
            {props.technologies.map((tech) => (
              <div className={classes["project-detail-tech-item"]}>
                <h5 className={classes["project-detail-tech-caption"]}>
                  {tech.caption}
                </h5>
                <img
                  className={classes["project-detail-tech-image"]}
                  src={tech.pic}
                  alt={tech}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
