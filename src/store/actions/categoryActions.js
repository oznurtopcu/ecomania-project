import { api } from "../../api/axios";
import { setCategories } from "./productActions";

// ... existing action types ...
export const FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR";

// ... existing action creators ...

// New action creators for fetching categories
export const fetchCategoriesStart = () => ({
  type: FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesError = (error) => ({
  type: FETCH_CATEGORIES_ERROR,
  payload: error,
});

// Thunk action for fetching categories
export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().product;

  if (categories.length === 0) {
    dispatch(fetchCategoriesStart());
    try {
      const response = await api.get("/categories");
      dispatch(setCategories(response.data));
      dispatch(fetchCategoriesSuccess());
    } catch (error) {
      dispatch(fetchCategoriesError(error.message));
    }
  }
};
