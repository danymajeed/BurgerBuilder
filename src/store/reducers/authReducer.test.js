import reducer from "./authReducer";

import * as actionTypes from "../actions/actionTypes";

describe("Authentication Reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      localId: null,
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });
  it("should store the token on authentication success", () => {
    expect(
      reducer(
        {
          idToken: null,
          localId: null,
          loading: false,
          error: null,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "idToken",
          localId: "localId",
        }
      )
    ).toEqual({
      idToken: "idToken",
      localId: "localId",
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });
});
