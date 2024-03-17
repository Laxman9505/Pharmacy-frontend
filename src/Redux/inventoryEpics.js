/** @format */

import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { API } from "../helpers/baseURL";

export const getAllProducts = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PRODUCTS_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/product/getAllProducts?page=${action.payload.page}&pageSize=${
            action.payload.pageSize
          }&searchKeyword=${action.payload.searchKeyword ?? ""}`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PRODUCTS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PRODUCTS_FAILURE",
            payload: error?.response?.data?.message?.[0]?.message,
          })
        )
      )
    )
  );

export const deleteProduct = (action$) =>
  action$.pipe(
    ofType("DELETE_PRODUCT_REQUEST"),
    mergeMap((action) =>
      from(API.delete(`/product/deleteProduct/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PRODUCT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PRODUCT_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );

export const addProduct = (action$) =>
  action$.pipe(
    ofType("ADD_PRODUCT_REQUEST"),
    mergeMap((action) =>
      from(API.post("/product/createUpdateProduct", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_PRODUCT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_PRODUCT_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );

export const getAddProductData = (action$) =>
  action$.pipe(
    ofType("GET_ADD_PRODUCT_DATA_REQUEST"),
    mergeMap((action) =>
      from(API.get("/product/getAddProductData", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ADD_PRODUCT_DATA_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ADD_PRODUCT_DATA_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );

export const addProductCategory = (action$) =>
  action$.pipe(
    ofType("ADD_PRODUCT_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/product-category/createUpdateCategory", action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_PRODUCT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_PRODUCT_CATEGORY_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );
export const deleteProductCategory = (action$) =>
  action$.pipe(
    ofType("DELETE_PRODUCT_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.delete(`/product-category/deleteCategory/${action.payload}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PRODUCT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PRODUCT_CATEGORY_FAILURE",
            payload: error?.response?.data?.message,
          })
        )
      )
    )
  );
export const getAllProductCategories = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PRODUCT_CATEGORIES_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/product-category/getAllCategories?page=${action.payload.page}&pageSize=${action.payload.pageSize}&searchKeyword=${action.payload.searchKeyword}`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PRODUCT_CATEGORIES_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PRODUCT_CATEGORIES_FAILURE",
            payload: error?.response?.data?.message?.[0]?.message,
          })
        )
      )
    )
  );
