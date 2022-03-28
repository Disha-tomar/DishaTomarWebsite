import classes from "../../styles/Button.module.scss";

const Button = (props) => {
  return <div className={classes["btn"]}>{props.children}</div>;
};

export default Button;
