/** @format */

import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer";
import cartReducer from "./cartReducer";
import commonReducer from "./commonReducer";
import customerReducer from "./customerReducer";
import inventoryReducer from "./inventoryReducer";
import ordersReducer from "./ordersReducer";
import supplierReducer from "./supplierReducer";
import storeReducer from "./storeReducer";

export const rootReducer = combineReducers({
  commonReducer,
  cartReducer,
  inventoryReducer,
  ordersReducer,
  commonReducer,
  authenticationReducer,
  customerReducer,
  supplierReducer,
  storeReducer,
});
