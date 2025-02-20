import { api } from "../../api/axios";
import { setUser } from "./clientActions";

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT"; // Yeni eklenen

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

// Yeni eklenen logout action
export const logout = () => {
  return async (dispatch) => {
    try {
      // Token'ları temizle
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      // Axios header'ı temizle
      delete api.defaults.headers.common["Authorization"];
      // User state'i temizle
      dispatch(setUser({}));

      return {
        type: LOGOUT,
      };
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
};

// Thunk Action
export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await api.post("/login", credentials);

      // Set user in store
      dispatch(setUser(response.data));

      // Always set token in axios headers
      api.defaults.headers.common["Authorization"] = response.data.token;

      if (credentials.rememberMe) {
        // Store token in localStorage for persistent login
        localStorage.setItem("token", response.data.token);
      } else {
        // Store token in sessionStorage - will be cleared when browser closes
        sessionStorage.setItem("token", response.data.token);
      }

      dispatch(loginSuccess());
      return response.data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
};
