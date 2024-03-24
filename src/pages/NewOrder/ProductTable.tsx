/** @format */

import { Button, Table, TableColumnsType } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../types/inventory";

const ProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product: Product) => {
    dispatch({
      type: "SET_ITEM_CART",
      payload: { ...product, quantity: 1 },
    });
  };
  const columns: TableColumnsType<Product> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: 1,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: 2,
    },
    {
      title: "Stock",
      dataIndex: "quantityInStock",
      key: 3,
    },
    {
      title: "Action",
      key: 4,
      dataIndex: "isActive",
      render: (_, record) => (
        <Button type="default" onClick={() => addToCartHandler(record)}>
          Add to cart{" "}
        </Button>
      ),
    },
  ];

  return (
    <Table
      key={2}
      className="product-table"
      columns={columns}
      dataSource={products}
      pagination={false}
    />
  );
};

export default ProductTable;
