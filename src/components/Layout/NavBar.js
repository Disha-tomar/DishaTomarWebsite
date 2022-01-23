import classes from "../../styles/NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes["navbar__links"]}>
        <button>About</button>
        <button>Projects</button>
        <button>Contact</button>
      </div>
    </div>
  );
};

export default NavBar;
