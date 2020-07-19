import React from "react";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map(
    (ingredientName) => {
      return (
        <li key={ingredientName}>
          <span style={{ textTransform: "capitalize" }}>
            {ingredientName}:{" "}
          </span>
          {props.ingredients[ingredientName]}
        </li>
      );
    }
  );
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <hr />
      <p>Delicious Burger is with following ingredients: </p>
      <ul>{ingredientsSummary}</ul>
      <hr />
      <p>
        <strong>Total Price: {props.price}</strong>
      </p>
      <div className="text-right">
        <button className="text-danger btn " onClick={props.closeModal}>
          CANCEL
        </button>

        <button
          className="text-success btn font-weight-bold"
          onClick={props.continueToCheckout}
        >
          CONTINUE
        </button>
      </div>
    </React.Fragment>
  );
};

export default OrderSummary;
