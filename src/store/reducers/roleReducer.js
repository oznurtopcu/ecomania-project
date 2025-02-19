import {
  FETCH_ROLES_START,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_ERROR,
} from "../actions/roleActions";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        loading: false,
      };
    case FETCH_ROLES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default roleReducer;
