import React from "react";
import classes from "./SidedrawerToggle.module.css";

const SidedrawerToggle = (props) => {
  return (
    <div className={classes.container} onClick={props.clicked}>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
    </div>
  );
};

export default SidedrawerToggle;
