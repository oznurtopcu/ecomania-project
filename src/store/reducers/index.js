import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import productReducer from "./productReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import roleReducer from "./roleReducer";
import { loginReducer } from "./loginReducer";

const reducers = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  roles: roleReducer,
  login: loginReducer,
});

export default reducers;
