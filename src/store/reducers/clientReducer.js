import {
  SET_USER,
  SET_ROLES,
  SET_ROLES_LOADING,
  SET_ROLES_ERROR,
  SET_THEME,
  SET_LANGUAGE,
} from "../actions/clientActions";

//initial state
const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  rolesLoading: false,
  rolesError: null,
  theme: "light",
  language: "en",
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case SET_ROLES_LOADING:
      return {
        ...state,
        rolesLoading: action.payload,
      };
    case SET_ROLES_ERROR:
      return {
        ...state,
        rolesError: action.payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
