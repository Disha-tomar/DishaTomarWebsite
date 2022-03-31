import classes from "../../styles/NavBar.module.scss";
import { Link } from "react-scroll";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes["navbar__links"]}>
        <Link to="about" spy={true} smooth={true}>
          <button>About</button>
        </Link>
        <Link to="projects" spy={true} smooth={true}>
          <button>Projects</button>
        </Link>
        <Link to="contact" spy={true} smooth={true}>
          <button>Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
