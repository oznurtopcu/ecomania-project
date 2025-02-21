import {
  // ... existing imports ...
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
} from "../actions/productActions";

const initialState = {
  categoriesLoading: false,
  categoriesError: null,
  // ... existing state
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_START:
      return {
        ...state,
        categoriesLoading: true,
        categoriesError: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesLoading: false,
        categoriesError: null,
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        categoriesError: action.payload,
        categoriesLoading: false,
      };
    // ... existing cases
    default:
      return state;
  }
};
