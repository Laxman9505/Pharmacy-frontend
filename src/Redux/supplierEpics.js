/** @format */

import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { API } from "../helpers/baseURL";

export const addSupplier = (action$) =>
  action$.pipe(
    ofType("ADD_SUPPLIER_REQUEST"),
    mergeMap((action) =>
      from(API.post("/supplier/createUpdateSupplier", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_SUPPLIER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_SUPPLIER_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );
export const deleteSupplier = (action$) =>
  action$.pipe(
    ofType("DELETE_SUPPLIER_REQUEST"),
    mergeMap((action) =>
      from(API.delete(`/supplier/deleteSupplier/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_SUPPLIER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_SUPPLIER_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );
export const getAllSuppliers = (action$) =>
  action$.pipe(
    ofType("GET_ALL_SUPPLIERS_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/supplier/getAllSuppliers?page=${action.payload.page}&pageSize=${
            action.payload.pageSize
          }&searchKeyword=${action.payload.searchKeyword ?? ""}`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_SUPPLIERS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_SUPPLIERS_FAILURE",
            payload: error?.response?.data?.message?.[0]?.message,
          })
        )
      )
    )
  );
