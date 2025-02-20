import { api } from "../../api/axios";
import { setUser } from "./clientActions";

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Thunk Action
export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await api.post("/login", credentials);

      // Set user in store
      dispatch(setUser(response.data));

      if (credentials.rememberMe) {
        // Store token and set axios headers
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common["Authorization"] = response.data.token;
      }

      dispatch(loginSuccess());
      return response.data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
};
