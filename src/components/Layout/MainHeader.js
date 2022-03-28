import classes from "../../styles/MainHeader.module.scss";
import HotAirBalloon from "../../images/baloon.gif";
import Button from "../UI/Button";
// import city from "../../images/cityscape.png";
// import city_1 from "../../images/city_1.gif";

const MainHeader = () => {
  return (
    <header className={classes["header"]}>
      <div className={classes["header-container"]}>
        <div className={classes["header-container-image"]}>
          <img
            className={classes["header-container-image--1"]}
            src={HotAirBalloon}
            alt="balloon"
          />
        </div>
        <h1>I'm Disha</h1>
        <div className={classes["header-container-heading--secondary"]}>
          <h2 className={classes["header-container-heading--secondary--1"]}>
            an architect.
          </h2>
          <h2 className={classes["header-container-heading--secondary--2"]}>
            an urban planner.
          </h2>
          <h2 className={classes["header-container-heading--secondary--3"]}>
            a software developer!
          </h2>
        </div>
        <div className={classes["header-container-image"]}>
          {" "}
          <img
            className={classes["header-container-image--2"]}
            src={HotAirBalloon}
            alt="balloon"
          />
        </div>
        {/* <div className={classes["header-container-city"]}>
          <img
            className={classes["header-container-city--1"]}
            src={city}
            alt="city"
          />
        </div> */}
      </div>
      <div className={classes["btn-container"]}>
        <Button>Know more about me</Button>
      </div>
    </header>
  );
};

export default MainHeader;
