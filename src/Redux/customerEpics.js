/** @format */

import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { API } from "../helpers/baseURL";

export const getAllCustomers = (action$) =>
  action$.pipe(
    ofType("GET_ALL_CUSTOMERS_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/customer/getAllCustomers?page=${action.payload.page}&pageSize=${
            action.payload.pageSize
          }&searchKeyword=${action.payload.searchKeyword ?? ""}`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_CUSTOMERS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_CUSTOMERS_FAILURE",
            payload: error?.response?.data?.message?.[0]?.message,
          })
        )
      )
    )
  );

export const deleteCustomer = (action$) =>
  action$.pipe(
    ofType("DELETE_CUSTOMER_REQUEST"),
    mergeMap((action) =>
      from(API.delete(`/customer/deleteCustomer/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_CUSTOMER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_CUSTOMER_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );

export const addCustomer = (action$) =>
  action$.pipe(
    ofType("ADD_CUSTOMER_REQUEST"),
    mergeMap((action) =>
      from(API.post("/customer/createUpdateCustomer", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_CUSTOMER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_CUSTOMER_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );
