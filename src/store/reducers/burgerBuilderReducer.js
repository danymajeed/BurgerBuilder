import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 40,
};

const INGREDIENTS_PRICE = {
  salad: 20,
  mutton: 80,
  beef: 60,
  cheese: 30,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        //for maintaing order of ingredients
        ingredients: {
          salad: action.ingredients.salad,
          beef: action.ingredients.beef,
          cheese: action.ingredients.cheese,
          mutton: action.ingredients.mutton,
        },
        totalPrice: 40,
        error: false,
      };
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
