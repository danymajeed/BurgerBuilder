import React from "react";
import BuildControl from "./BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Beef", type: "beef" },
  { label: "Cheese", type: "cheese" },
  { label: "Mutton", type: "mutton" },
];

const BuildControls = (props) => {
  return (
    <div
      className={
        classes.border +
        " bg-brown w-100 d-flex flex-column align-items-center pt-3"
      }
    >
      <p>
        Current Price <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.label}
            label={control.label}
            disable={props.disable[control.type]}
            add={() => props.addIngredient(control.type)}
            remove={() => props.removeIngredient(control.type)}
          ></BuildControl>
        );
      })}
      <button
        className={classes.OrderButton + " mt-2"}
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGN IN TO ORDER"}
      </button>
      ;
    </div>
  );
};

export default BuildControls;
