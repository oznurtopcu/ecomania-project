import axios from "axios";
import { api } from "../../api/axios";

// Action Types
export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_ROLES_LOADING = "SET_ROLES_LOADING";
export const SET_ROLES_ERROR = "SET_ROLES_ERROR";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setRolesLoading = (isLoading) => ({
  type: SET_ROLES_LOADING,
  payload: isLoading,
});

export const setRolesError = (error) => ({
  type: SET_ROLES_ERROR,
  payload: error,
});

export const fetchRoles = () => async (dispatch, getState) => {
  const { client } = getState();
  if (client.roles.length === 0) {
    dispatch(setRolesLoading(true));
    try {
      const response = await api.get("/roles");
      dispatch(setRoles(response.data));
      dispatch(setRolesError(null));
    } catch (error) {
      dispatch(setRolesError(error.message));
    } finally {
      dispatch(setRolesLoading(false));
    }
  }
};
