import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      quantity: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map((ingredient) => {
    return (
      <React.Fragment key={ingredient.name}>
        {ingredient.quantity !== 0 ? (
          <p>
            {ingredient.name}: <strong>{ingredient.quantity}</strong>
          </p>
        ) : null}
      </React.Fragment>
    );
  });
  return (
    <div className={classes.Order}>
      <h4>Order# {props.orderNo}</h4>
      <hr />
      <div style={{ textTransform: "capitalize" }}>{ingredientsOutput}</div>
      <p>
        Price: Rs<strong> {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
