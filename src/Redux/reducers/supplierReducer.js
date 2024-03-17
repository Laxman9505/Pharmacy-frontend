/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_SUPPLIERS_REQUEST":
      return {
        ...state,
        isLoading: true,
        addSuccess: false,
      };
    case "GET_ALL_SUPPLIERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allSuppliers: payload.items,
        totalSuppliers: payload.totalItems,
      };
    case "GET_ALL_SUPPLIERS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case "ADD_SUPPLIER_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_SUPPLIER_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_SUPPLIER_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };

    case "DELETE_SUPPLIER_REQUEST":
      return {
        ...state,
        isLoading: true,
        isDeleteSuccess: false,
      };
    case "DELETE_SUPPLIER_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: true,
      };
    case "DELETE_SUPPLIER_FAILURE":
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
