import * as actionTypes from "../actions/actionTypes";
import axiosInstance from "../../axiosOrders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initializeIngredients = () => {
  return (disptach) => {
    axiosInstance
      .get("/ingredients.json")
      .then((response) => {
        disptach(setIngredients(response.data));
      })
      .catch((error) => {
        disptach(fetchIngredientsFailed());
      });
  };
};
