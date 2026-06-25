import { useEffect, useRef } from "react";
import classes from "../../styles/MainHeader.module.scss";
import HotAirBalloon from "../../images/baloon.gif";
import Button from "../UI/Button";
import { Link } from "react-scroll";
import NeuralGraph from "../UI/NeuralGraph";
// import city from "../../images/cityscape.png";
// import city_1 from "../../images/city_1.gif";

const MainHeader = () => {
  const headerRef = useRef(null);
  const balloon1Ref = useRef(null);
  const balloon2Ref = useRef(null);

  // Gentle cursor parallax + idle bob for the balloon GIFs. Runs after their
  // CSS entrance animation and is skipped entirely under reduced-motion.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const header = headerRef.current;
    if (reduce || !header) return;

    const balloons = [
      { el: balloon1Ref.current, depth: 0.6, phase: 0, amp: 7, speed: 0.5 },
      {
        el: balloon2Ref.current,
        depth: 0.9,
        phase: Math.PI,
        amp: 9,
        speed: 0.4,
      },
    ].filter((b) => b.el);

    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e) => {
      const rect = header.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      mouse.x = 0.5;
      mouse.y = 0.5;
    };

    let raf;
    const frame = (now) => {
      const t = now / 1000;
      const ox = mouse.x - 0.5;
      const oy = mouse.y - 0.5;
      balloons.forEach((b) => {
        const px = -ox * 30 * b.depth;
        const py = -oy * 20 * b.depth + Math.sin(t * b.speed + b.phase) * b.amp;
        b.el.style.transform = "translate(" + px + "px," + py + "px)";
      });
      raf = requestAnimationFrame(frame);
    };

    header.addEventListener("mousemove", onMove);
    header.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      header.removeEventListener("mousemove", onMove);
      header.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header className={classes["header"]} ref={headerRef}>
      <NeuralGraph />
      <div className={classes["header-container"]}>
        <div className={classes["header-container-image"]}>
          <img
            ref={balloon1Ref}
            className={classes["header-container-image--1"]}
            src={HotAirBalloon}
            alt="balloon"
          />
        </div>
        <h1>I'm Disha</h1>
        <div className={classes["header-container-heading--secondary"]}>
          {/* <h2 className={classes["header-container-heading--secondary--1"]}>
            an architect.
          </h2>
          <h2 className={classes["header-container-heading--secondary--2"]}>
            an urban planner.
          </h2> */}
          <h2 className={classes["header-container-heading--secondary--3"]}>
            an AI & Full-Stack Engineer!
          </h2>
        </div>
        <div className={classes["header-container-image"]}>
          {" "}
          <img
            ref={balloon2Ref}
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
        <Link to="about" spy={true} smooth={true}>
          <Button>Know more about me</Button>
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
