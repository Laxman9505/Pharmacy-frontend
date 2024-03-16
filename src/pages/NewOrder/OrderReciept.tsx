/** @format */

import { Col, Divider, Drawer, Row, Typography } from "antd";
import React, { Dispatch, SetStateAction } from "react";

const { Title, Paragraph } = Typography;

const OrderReciept: React.FC<{
  isOrderReceiptOpen: boolean;
  setIsOrderReceiptOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOrderReceiptOpen, setIsOrderReceiptOpen }) => {
  const productList = [
    { name: "Product 1", quantity: 2, price: 10 },
    { name: "Product 2", quantity: 1, price: 15 },
    { name: "Product 3", quantity: 3, price: 8 },
  ];

  // Calculate total amount
  const subTotal = productList.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const discount = 5; // Example discount percentage
  const totalAmount = subTotal - (subTotal * discount) / 100;
  return (
    <>
      <Drawer
        title="Payment Reciept"
        onClose={() => setIsOrderReceiptOpen(false)}
        open={isOrderReceiptOpen}
      >
        <div style={{ margin: "auto" }}>
          {/* Store Information */}
          <Title level={3} style={{ textAlign: "center" }}>
            Pharmacy XYZ
          </Title>
          <Paragraph style={{ textAlign: "center" }}>
            123 Pharmacy Street, Cityville
          </Paragraph>
          <Paragraph style={{ textAlign: "center" }}>
            Phone: (123) 456-7890
          </Paragraph>

          {/* Header Text */}
          <Divider />
          <Paragraph style={{ textAlign: "center", fontStyle: "italic" }}>
            Your Trusted Health Partner
          </Paragraph>
          <Divider />
          <Row style={{ marginBottom: "8px" }}>
            <Col span={12}>
              <Typography.Text strong>Item Name</Typography.Text>{" "}
            </Col>
            <Col span={6}>
              {" "}
              <Typography.Text strong>Quantity</Typography.Text>
            </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <Typography.Text strong>Price</Typography.Text>
            </Col>
          </Row>
          <div style={{ marginBottom: "20px" }}>
            {productList.map((product) => (
              <div key={product.name} style={{ marginBottom: "8px" }}>
                <Row>
                  <Col span={12}>{product.name}</Col>
                  <Col span={6}>{product.quantity}</Col>
                  <Col span={6} style={{ textAlign: "right" }}>
                    ${product.price.toFixed(2)}
                  </Col>
                </Row>
              </div>
            ))}
          </div>

          {/* Divider */}
          <Divider />

          {/* Total Section */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={4}>Subtotal</Title>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Title level={4}>${subTotal}</Title>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={4}>Discount</Title>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Title level={4}>-${(subTotal * discount) / 100}</Title>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={3}>Total</Title>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Title level={3}>${totalAmount}</Title>
            </Col>
          </Row>

          {/* Footer */}
          <Divider />
          <Paragraph style={{ textAlign: "center", marginTop: "16px" }}>
            Thank you for choosing Pharmacy XYZ. Your health is our priority.
          </Paragraph>
        </div>
      </Drawer>
    </>
  );
};

export default OrderReciept;
