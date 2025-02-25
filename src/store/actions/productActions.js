import { api } from "../../api/axios";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";
export const SET_SORT = "SET_SORT";
export const SET_PRODUCT_DETAIL = "SET_PRODUCT_DETAIL";

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

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
});

export const setProductDetail = (product) => ({
  type: SET_PRODUCT_DETAIL,
  payload: product,
});

// Thunk action for fetching products
export const fetchProducts = (catId) => async (dispatch, getState) => {
  try {
    dispatch(setFetchState("NOT_FETCHED"));
    let queryParams = {
      category: catId,
    };

    // Get filter from Redux store
    const { filter, sort, limit, offset } = getState().product;

    // Add filter to queryParams if it exists
    if (filter) {
      queryParams.filter = filter;
    }
    if (sort) {
      queryParams.sort = sort;
    }
    if (limit) {
      queryParams.limit = limit;
    }
    if (offset) {
      queryParams.offset = offset;
    }

    // Convert query params to URL string
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    console.log("queryString:::::::::::::::::::::::::::" + queryString);

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

// Thunk action for fetching a single product by ID
export const fetchProductById = (productId) => async (dispatch) => {
  try {
    console.log("Starting fetchProductById with ID:", productId);
    dispatch(setFetchState("NOT_FETCHED"));
    dispatch(setProductDetail({}));

    console.log("Making API call to:", `/products/${productId}`);
    const response = await api.get(`/products/${productId}`);
    console.log("API Response:", response);

    if (response.data) {
      console.log("Dispatching product detail:", response.data);
      dispatch(setProductDetail(response.data));
      dispatch(setFetchState("FETCHED"));
    } else {
      console.log("No data in response");
      dispatch(setFetchState("ERROR"));
      dispatch(setProductDetail({}));
    }
  } catch (error) {
    console.error("fetchProductById error details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    dispatch(setFetchState("ERROR"));
    dispatch(setProductDetail({}));
  }
};
