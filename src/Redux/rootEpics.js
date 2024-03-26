/** @format */

import { combineEpics } from "redux-observable";

import {
  addProduct,
  addProductCategory,
  deleteProduct,
  deleteProductCategory,
  getAddProductData,
  getAllProductCategories,
  getAllProducts,
} from "./inventoryEpics";

import { addCustomer, deleteCustomer, getAllCustomers } from "./customerEpics";
import {
  getDashboardDataEpic,
  loginEpic,
  registerOnBoardUserEpic,
  sendOTPtoMail,
  validateOTPEpic,
} from "./myEpics";
import {
  getAllOrdersEpic,
  getNewOrderCreationData,
  placeOrderEpic,
} from "./ordersEpic";
import { addSupplier, deleteSupplier, getAllSuppliers } from "./supplierEpics";
import { getStoreDetail, saveStoreDetail } from "./storeEpics";

export const rootEpic = combineEpics(
  getAllProducts,
  addProduct,
  deleteProduct,
  getAllCustomers,
  addCustomer,
  deleteCustomer,
  getAllProductCategories,
  deleteProductCategory,
  addProductCategory,
  getAddProductData,
  loginEpic,
  getAllOrdersEpic,
  registerOnBoardUserEpic,
  getDashboardDataEpic,
  placeOrderEpic,
  sendOTPtoMail,
  validateOTPEpic,
  getNewOrderCreationData,
  getAllSuppliers,
  addSupplier,
  deleteSupplier,
  saveStoreDetail,
  getStoreDetail
);
