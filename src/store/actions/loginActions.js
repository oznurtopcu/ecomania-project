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

      // User bilgisini client reducer'a gönderiyoruz
      console.log("User", response.data);
      dispatch(setUser(response.data));

      if (credentials.rememberMe) {
        localStorage.setItem("token", response.data.token);
      }

      dispatch(loginSuccess());
      return response.data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
};
