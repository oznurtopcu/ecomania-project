// import {
//   SET_ADDRESS,
//   SET_CART,
//   SET_PAYMENT,
// } from "../actions/shoppingCartActions";

// const initialState = {
//   cart: [],
//   payment: {},
//   address: {},
// };

// // Reducer
// const shoppingCartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_CART:
//       return {
//         ...state,
//         cart: action.payload,
//       };
//     case SET_PAYMENT:
//       return {
//         ...state,
//         payment: action.payload,
//       };
//     case SET_ADDRESS:
//       return {
//         ...state,
//         address: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default shoppingCartReducer;

import {
  SET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  SET_PAYMENT,
  SET_ADDRESS,
  TOGGLE_CART_ITEM_CHECK,
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        ),
      };

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    case TOGGLE_CART_ITEM_CHECK:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, checked: action.payload.checked ?? !item.checked }
            : item
        ),
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;
