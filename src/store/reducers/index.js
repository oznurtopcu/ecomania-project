import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import productReducer from "./productReducer";

const reducers = combineReducers({
  client: clientReducer,
  product: productReducer,
});

export default reducers;
