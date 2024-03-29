/** @format */
import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_NEW_ORDER_CREATION_DATA_REQUEST":
      return {
        ...state,
        getNewOrderCreationDataLoading: true,
      };

    case "GET_NEW_ORDER_CREATION_DATA_SUCCESS":
      return {
        ...state,
        getNewOrderCreationDataLoading: false,
        newOrderCreationData: payload,
      };

    case "GET_NEW_ORDER_CREATION_DATA_FAILURE":
      return {
        ...state,
        getNewOrderCreationDataLoading: false,
      };
    case "GET_ORDER_DETAIL_REQUEST":
      return {
        ...state,
        getOrderDetailLoading: true,
      };
    case "GET_ORDER_DETAIL_SUCCESS":
      return {
        ...state,
        getOrderDetailLoading: false,
        orderDetails: payload,
      };
    case "GET_ORDER_DETAIL_FAILURE":
      return {
        ...state,
        getOrderDetailLoading: false,
      };
    case "CANCEL_ORDER_REQUEST":
      return {
        ...state,
        isLoading: true,
        isCancelOrderSuccess: false,
      };
    case "CANCEL_ORDER_SUCCESS":
      openNotificationWithIcon("success", payload?.message);

      return {
        ...state,
        isLoading: false,
        isCancelOrderSuccess: true,
      };
    case "CANCEL_ORDER_FAILURE":
      openNotificationWithIcon("error", payload.message);

      return {
        ...state,
        isLoading: false,
        isCancelOrderSuccess: false,
      };
    case "GET_ALL_ORDERS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_ALL_ORDERS_SUCCESS":
      return {
        ...state,
        isLoading: false,

        allOrders: payload.items,
        totalOrders: payload.totalItems,
      };

    case "GET_ALL_ORDERS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    case "GET_ORDER_DETAIL_BY_ID_REQUEST":
      return {
        ...state,
        getLoading: true,
        deleteSuccess: false,
      };

    case "GET_ORDER_DETAIL_BY_ID_SUCCESS":
      return {
        ...state,
        getLoading: false,
        payLoading: false,
        orderDetails: payload,
      };

    case "GET_ORDER_DETAIL_BY_ID_FAILURE":
      return {
        ...state,
        getLoading: false,
      };
    case "RESET_STATE_ORDER_REDUCER":
      return {
        ...state,
        orderDetails: {},
        printingData: null,
      };
    case "PLACE_ORDER_REQUEST":
      return {
        ...state,
        placeOrderLoading: true,
        isPlaceOrderSuccess: false,
      };
    case "PLACE_ORDER_SUCCESS":
      if (!payload?.isPaymentCompleted) {
        openNotificationWithIcon("success", payload?.msg);
      }

      return {
        ...state,
        placeOrderLoading: false,
        isPlaceOrderSuccess: true,
        placeOrderResponse: payload,
      };
    case "PLACE_ORDER_FAILURE":
      openNotificationWithIcon("error", "Something Went Wrong");

      return {
        ...state,
        placeOrderLoading: false,
        isPlaceOrderSuccess: false,
      };

    case "CLEAR_ORDER_REDUCER":
      return {
        ...state,
        isPlaceOrderSuccess: false,
        placeOrderResponse: {},
      };
    default:
      return state;
  }
}
