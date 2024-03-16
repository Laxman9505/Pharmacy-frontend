/** @format */

// useCartActions.ts

import { useDispatch, useSelector } from "react-redux";

import { Product } from "../types/inventory";

const useCartActions = () => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: any) => state.cartReducer);

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "SET_ITEM_CART",
      payload: product,
    });
  };

  const handleRemoveItemFromCart = (index: string) => {
    dispatch({
      type: "REMOVE_ITEM_CART",
      payload: { index },
    });
  };

  const handleAddQuantity = (product: Product) => {
    dispatch({
      type: "ADD_QUANTITY_ITEM",
      payload: product,
    });
  };

  const handleSubtractQuantity = (product: Product) => {
    dispatch({
      type: "SUBTRACT_QUANTITY_ITEM",
      payload: product,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  function calculateItemsSubtotal() {
    return cartProducts.reduce((subtotal, product) => {
      if (product.price && product.quantity) {
        subtotal += product.price * product.quantity;
      }
      return subtotal;
    }, 0);
  }

  return {
    handleAddToCart,
    handleRemoveItemFromCart,
    handleAddQuantity,
    handleSubtractQuantity,
    calculateItemsSubtotal,
    clearCart,
  };
};

export default useCartActions;
