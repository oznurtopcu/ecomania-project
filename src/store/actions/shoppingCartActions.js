// // Action Types
// export const SET_CART = "SET_CART";
// export const SET_PAYMENT = "SET_PAYMENT";
// export const SET_ADDRESS = "SET_ADDRESS";

// // Action Creators
// export const setCart = (cart) => ({
//   type: SET_CART,
//   payload: cart,
// });

// export const setPayment = (payment) => ({
//   type: SET_PAYMENT,
//   payload: payment,
// });

// export const setAddress = (address) => ({
//   type: SET_ADDRESS,
//   payload: address,
// });

// Mevcut action type'ları güncelliyoruz
export const SET_CART = "SET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";
export const TOGGLE_CART_ITEM_CHECK = "TOGGLE_CART_ITEM_CHECK";

// Action creator'ları güncelliyoruz
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    count: 1,
    checked: true,
    product,
  },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateCartItem = (productId, count) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count },
});

// Mevcut action creator'lar
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const toggleCartItemCheck = (productId, checked) => ({
  type: TOGGLE_CART_ITEM_CHECK,
  payload: { productId, checked },
});
