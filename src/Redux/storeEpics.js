/** @format */

import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { API } from "../helpers/baseURL";

export const saveStoreDetail = (action$) =>
  action$.pipe(
    ofType("SAVE_STORE_DETAIL_REQUEST"),
    mergeMap((action) =>
      from(API.post("/store/saveStoreDetail", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "SAVE_STORE_DETAIL_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "SAVE_STORE_DETAIL_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );

export const getStoreDetail = (action$) =>
  action$.pipe(
    ofType("GET_STORE_DETAIL_REQUEST"),
    mergeMap((action) =>
      from(API.get("/store/getStoreDetail")).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_STORE_DETAIL_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_STORE_DETAIL_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );
