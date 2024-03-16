/** @format */

import { getLocalStorage, setLocalStorage } from "../../helpers/frontendHelper";

import { message } from "antd";

const initialState = {
  cartProducts:
    getLocalStorage("cartData") || getLocalStorage("cartData")?.length > 0
      ? getLocalStorage("cartData")
      : [],
};

export default function (state = initialState, action) {
  const { type, payload, notification } = action;
  let cartData = [...state.cartProducts];
  switch (type) {
    case "SET_ITEM_CART":
      const existingProductIndex = cartData.findIndex(
        (item) => item._id === payload._id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        cartData[existingProductIndex].quantity += 1;
      } else {
        // If the product is not in the cart, add it with quantity 1
        cartData.push({ ...payload, quantity: 1 });
      }

      setLocalStorage("cartData", cartData);

      if (notification !== "off") {
        message.success("Added to cart !");
      }

      return {
        ...state,
        cartProducts: cartData,
      };

    case "REMOVE_ITEM_CART":
      const newData = cartData.filter(
        (cartItem, index) => index != payload?.index
      );

      setLocalStorage("cartData", newData);
      return {
        ...state,
        cartProducts: newData,
      };
    case "ADD_QUANTITY_ITEM":
      cartData[cartData.indexOf(payload)].quantity =
        state.cartProducts[state.cartProducts.indexOf(payload)].quantity + 1;

      setLocalStorage("cartData", cartData);
      return {
        ...state,
        cartProducts: cartData,
      };
    case "SUBTRACT_QUANTITY_ITEM":
      if (cartData[cartData.indexOf(payload)].quantity > 1) {
        cartData[cartData.indexOf(payload)].quantity =
          state.cartProducts[state.cartProducts.indexOf(payload)].quantity - 1;
      }
      setLocalStorage("cartData", cartData);
      return {
        ...state,
        cartProducts: cartData,
      };

    case "CLEAR_CART":
      localStorage.removeItem("cartData");
      return {
        ...state,
        cartProducts: [],
      };
    default:
      return state;
  }
}
