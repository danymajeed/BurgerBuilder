import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope the burger tastes well!</h1>
      <div>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <button onClick={props.goBack} className="btn text-danger mx-2">
        BACK
      </button>
      <button
        onClick={props.goForward}
        className="btn text-success font-weight-bold"
      >
        CONTINUE
      </button>
    </div>
  );
};

export default CheckoutSummary;
