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
  cancelOrderEpic,
  getAllOrdersEpic,
  getNewOrderCreationData,
  getOrderDetailEpic,
  placeOrderEpic,
} from "./ordersEpic";
import { getStoreDetail, saveStoreDetail } from "./storeEpics";
import { addSupplier, deleteSupplier, getAllSuppliers } from "./supplierEpics";

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
  getStoreDetail,
  getOrderDetailEpic,
  cancelOrderEpic
);
