/** @format */

import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import React from "react";
import { CURRENCY_SYMBOL } from "../../constants/constants";
import useCartActions from "../../hooks/cartActions";
import { Product } from "../../types/inventory";

const CartItem: React.FC<{ product: Product; index: string }> = ({
  product,
  index,
}) => {
  const {
    handleRemoveItemFromCart,
    handleAddQuantity,
    handleSubtractQuantity,
  } = useCartActions();

  return (
    <Card>
      <Row>
        <Col span={3}>
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        </Col>
        <Col span={12}>
          <Flex vertical>
            <Typography.Text type="secondary" className="m-0">
              {product.name}
            </Typography.Text>
            <Typography.Title level={5} className="m-0">
              {CURRENCY_SYMBOL} {product.price}
            </Typography.Title>
          </Flex>
        </Col>
        <Col span={9}>
          <Flex gap={"small"} align="center">
            <Space>
              <Button
                shape="circle"
                size="small"
                type="primary"
                icon={<MinusOutlined />}
                onClick={() => handleSubtractQuantity(product)}
              ></Button>
              <Typography.Title level={5} className="m-0">
                {product.quantity}
              </Typography.Title>
              <Button
                shape="circle"
                size="small"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAddQuantity(product)}
              ></Button>
            </Space>
            <Popconfirm
              title="Delete Product"
              description="Are you sure want to delete the product ?"
              onConfirm={() => handleRemoveItemFromCart(index)}
            >
              <Button
                size="small"
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                danger
              ></Button>
            </Popconfirm>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
