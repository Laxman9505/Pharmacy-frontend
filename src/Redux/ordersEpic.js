/** @format */

import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { API } from "../helpers/baseURL";

export const getAllOrdersEpic = (action$) =>
  action$.pipe(
    ofType("GET_ALL_ORDERS_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/order/getAllOrders?page=${action.payload.page}&perPage=${
            action.payload.pageSize
          }&searchKeyword=${action.payload.searchKeyword ?? ""}`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_ORDERS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_ORDERS_FAILURE",
            payload: error?.response?.data?.message?.[0]?.message,
          })
        )
      )
    )
  );
export const placeOrderEpic = (action$) =>
  action$.pipe(
    ofType("PLACE_ORDER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/order/placeOrder`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "PLACE_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "PLACE_ORDER_FAILURE",
            payload: error?.response?.data?.message?.[0]?.message,
          })
        )
      )
    )
  );
export const getNewOrderCreationData = (action$) =>
  action$.pipe(
    ofType("GET_NEW_ORDER_CREATION_DATA_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/order/getNewOrderCreationData?searchKeyword=${
            action.payload.searchKeyword ?? ""
          }`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_NEW_ORDER_CREATION_DATA_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_NEW_ORDER_CREATION_DATA_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );
export const getOrderDetailEpic = (action$) =>
  action$.pipe(
    ofType("GET_ORDER_DETAIL_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/order/getOrderDetail/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ORDER_DETAIL_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ORDER_DETAIL_FAILURE",
            payload: error?.response?.data?.message?.[0]?.message,
          })
        )
      )
    )
  );
export const cancelOrderEpic = (action$) =>
  action$.pipe(
    ofType("CANCEL_ORDER_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/order/cancelOrder/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "CANCEL_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CANCEL_ORDER_FAILURE",
            payload: error?.response?.data,
          })
        )
      )
    )
  );
