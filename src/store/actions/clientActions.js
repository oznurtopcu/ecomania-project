import { api } from "../../api/axios";

// Action Types
export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_ADDRESS_LIST = "SET_ADDRESS_LIST";
export const SET_CREDIT_CARDS = "SET_CREDIT_CARDS";

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

export const setAddressList = (addresses) => ({
  type: SET_ADDRESS_LIST,
  payload: addresses,
});

export const setCreditCards = (creditCards) => ({
  type: SET_CREDIT_CARDS,
  payload: creditCards,
});

// Thunk Actions
export const fetchAddresses = () => async (dispatch) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await api.get("/user/address", {
      headers: { Authorization: token },
    });
    dispatch(setAddressList(response.data));
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    await api.post("/user/address", addressData, {
      headers: { Authorization: token },
    });
    await dispatch(fetchAddresses());
    return true;
  } catch (error) {
    console.error("Error adding address:", error);
    return false;
  }
};

export const updateAddress = (addressData) => async (dispatch) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    await api.put("/user/address", addressData, {
      headers: { Authorization: token },
    });
    await dispatch(fetchAddresses());
    return true;
  } catch (error) {
    console.error("Error updating address:", error);
    return false;
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    await api.delete(`/user/address/${addressId}`, {
      headers: { Authorization: token },
    });
    await dispatch(fetchAddresses());
    return true;
  } catch (error) {
    console.error("Error deleting address:", error);
    return false;
  }
};
