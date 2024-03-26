/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  saveSuccess: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_STORE_DETAIL_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_STORE_DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        storeDetail: payload,
      };
    case "GET_STORE_DETAIL_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case "SAVE_STORE_DETAIL_REQUEST":
      return {
        ...state,
        saveLoading: true,
      };
    case "SAVE_STORE_DETAIL_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        saveLoading: false,
        saveSuccess: payload,
      };
    case "SAVE_STORE_DETAIL_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        saveLoading: false,
        error: payload,
      };

    default:
      return state;
  }
}
