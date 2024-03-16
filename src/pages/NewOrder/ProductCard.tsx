/** @format */
import { Button, Card, Flex, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { CURRENCY_SYMBOL } from "../../constants/constants";
import { Product } from "../../types/inventory";

const { Meta } = Card;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch({
      type: "SET_ITEM_CART",
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <Card
      style={{ minWidth: "10vw" }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Button type="default" onClick={addToCartHandler}>
          Add to cart{" "}
        </Button>,
      ]}
    >
      <Flex vertical justify="center" align="center">
        <Typography.Text>{product.name}</Typography.Text>
        <Typography.Title className="m-0" level={5}>
          {CURRENCY_SYMBOL} {product.price}
        </Typography.Title>
      </Flex>
    </Card>
  );
};

export default ProductCard;
