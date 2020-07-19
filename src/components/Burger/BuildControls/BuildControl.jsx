import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.remove}
        disabled={props.disable}
      >
        Less
      </button>
      <button onClick={props.add} className={classes.More}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
