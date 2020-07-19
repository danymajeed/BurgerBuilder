import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientName) => {
      return [...Array(props.ingredients[ingredientName])].map((_, index) => {
        return (
          <BurgerIngredient
            key={ingredientName + index}
            type={ingredientName}
          />
        );
      });
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = (
      <p className="text-center m-0 ">Please start adding ingredients</p>
    );
  }

  return (
    <div
      className={
        classes.burger +
        "  p-2 my-4 d-flex flex-column justify-content-center mx-auto font-weight-bold"
      }
    >
      <BurgerIngredient type="breadTop" />
      {transformedIngredients}
      <BurgerIngredient type="breadBottom" />
    </div>
  );
};

export default Burger;
