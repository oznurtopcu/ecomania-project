import { api } from "../../api/axios";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";

// Action Creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

// Thunk action for fetching products
export const fetchProducts =
  (queryParams = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch(setFetchState("NOT_FETCHED"));

      // Get filter from Redux store
      const { filter } = getState().product;

      // Add filter to queryParams if it exists
      if (filter) {
        queryParams.filter = filter;
      }

      // Convert query params to URL string
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const url = `/products${queryString ? `?${queryString}` : ""}`;
      const response = await api.get(url);

      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("fetchProducts error:", error);
      dispatch(setFetchState("ERROR"));
    }
  };
