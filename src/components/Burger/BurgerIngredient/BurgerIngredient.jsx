import React from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const BurgerIngredient = (props) => {
  BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
  };

  let ingredient = null;
  if (props.type === "breadBottom")
    ingredient = <div className={classes.breadBottom}></div>;
  else if (props.type === "breadTop")
    ingredient = (
      <div className={classes.breadTop}>
        <div className={classes.seeds1}></div>
        <div className={classes.seeds2}></div>
      </div>
    );
  else if (props.type === "beef")
    ingredient = <div className={classes.beef}></div>;
  else if (props.type === "cheese")
    ingredient = <div className={classes.cheese}></div>;
  else if (props.type === "salad")
    ingredient = <div className={classes.salad}></div>;
  else if (props.type === "mutton")
    ingredient = <div className={classes.mutton}></div>;
  return ingredient;
};

export default BurgerIngredient;
