/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_PRODUCTS_REQUEST":
      return {
        ...state,
        isLoading: true,
        addSuccess: false,
      };
    case "GET_ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allProducts: payload.items,
        totalProducts: payload.totalItems,
      };
    case "GET_ALL_PRODUCTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case "GET_ALL_PRODUCT_CATEGORIES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_PRODUCT_CATEGORIES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allProductCategories: payload.items,
        totalProductCategories: payload.totalItems,
      };
    case "GET_ALL_PRODUCT_CATEGORIES_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case "ADD_PRODUCT_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_PRODUCT_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_PRODUCT_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "GET_ADD_PRODUCT_DATA_REQUEST":
      return {
        ...state,
        getAddProductDataLoading: true,
      };
    case "GET_ADD_PRODUCT_DATA_SUCCESS":
      return {
        ...state,
        getAddProductDataLoading: false,
        addProductData: payload,
      };
    case "GET_ADD_PRODUCT_DATA_FAILURE":
      return {
        ...state,
        getAddProductDataLoading: false,
        error: payload,
      };
    case "ADD_PRODUCT_CATEGORY_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_PRODUCT_CATEGORY_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_PRODUCT_CATEGORY_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };

    case "DELETE_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
        isDeleteSuccess: false,
      };
    case "DELETE_PRODUCT_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: true,
      };
    case "DELETE_PRODUCT_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
        isDeleteSuccess: false,
      };

    case "DELETE_PRODUCT_CATEGORY_REQUEST":
      return {
        ...state,
        isLoading: true,
        isDeleteSuccess: false,
      };
    case "DELETE_PRODUCT_CATEGORY_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: true,
      };
    case "DELETE_PRODUCT_CATEGORY_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
        isDeleteSuccess: false,
      };
    default:
      return state;
  }
}
