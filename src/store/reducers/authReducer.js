import * as actionTypes from "../actions/actionTypes";

const initialState = {
  idToken: null,
  localId: null,
  loading: false,
  error: null,
  authRedirectPath: "/",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, error: null, loading: true };
    case actionTypes.AUTH_FAILED: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        localId: action.localId,
        idToken: action.idToken,
      };
    }
    case actionTypes.AUTH_LOGOUT: {
      return {
        ...state,
        localId: null,
        idToken: null,
      };
    }
    case actionTypes.SET_AUTH_REDIRECT_PATH: {
      return {
        ...state,
        authRedirectPath: action.path,
      };
    }
    default:
      return state;
  }
};

export default reducer;
