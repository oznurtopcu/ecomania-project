import { api } from "../../api/axios";

// Action Types
export const FETCH_ROLES_START = "FETCH_ROLES_START";
export const FETCH_ROLES_SUCCESS = "FETCH_ROLES_SUCCESS";
export const FETCH_ROLES_ERROR = "FETCH_ROLES_ERROR";

// Action Creators
export const fetchRolesStart = () => ({
  type: FETCH_ROLES_START,
});

export const fetchRolesSuccess = (roles) => ({
  type: FETCH_ROLES_SUCCESS,
  payload: roles,
});

export const fetchRolesError = (error) => ({
  type: FETCH_ROLES_ERROR,
  payload: error,
});

// Thunk Action
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().roles; // roles reducer'ından mevcut rolleri al

  if (roles.length === 0) {
    // Eğer roller henüz yüklenmediyse
    dispatch(fetchRolesStart());
    try {
      const response = await api.get("/roles");
      dispatch(fetchRolesSuccess(response.data));
    } catch (error) {
      dispatch(fetchRolesError(error.message));
    }
  }
};
