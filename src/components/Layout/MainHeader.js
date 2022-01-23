import classes from "../../styles/MainHeader.module.scss";
import HotAirBalloon from "../../images/baloon.gif";
import city from "../../images/cityscape.png";

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
          <h2>a software developer!</h2>
        </div>
        <div className={classes["header-container-image"]}>
          {" "}
          <img
            className={classes["header-container-image--2"]}
            src={HotAirBalloon}
            alt="balloon"
          />
        </div>
        <div className={classes["header-container-city"]}>
          <img
            className={classes["header-container-city--1"]}
            src={city}
            alt="city"
          />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
