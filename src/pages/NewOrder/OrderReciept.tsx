/** @format */

import { Col, Divider, Drawer, Row, Typography } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCY_SYMBOL, THEME_COLOR } from "../../constants/constants";

const { Title, Paragraph } = Typography;

const OrderReciept: React.FC<{
  isOrderReceiptOpen: boolean;
  setIsOrderReceiptOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOrderReceiptOpen, setIsOrderReceiptOpen }) => {
  const dispatch = useDispatch();
  const { placeOrderResponse } = useSelector(
    (state: any) => state.ordersReducer
  );
  const orderReceipt = placeOrderResponse?.receipt;

  const productList = orderReceipt?.products?.map((product, index) => {
    return {
      name: product.productName,
      quantity: product.quantity,
      price: product.boughtPrice,
    };
  });

  // Calculate total amount
  const subTotal = productList?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <>
      <Drawer
        title="Payment Reciept"
        onClose={() => {
          dispatch({ type: "CLEAR_ORDER_REDUCER" });
          setIsOrderReceiptOpen(false);
        }}
        open={isOrderReceiptOpen}
        bodyStyle={{ background: THEME_COLOR, padding: 8 }}
      >
        <div
          className="ms-2 mt-2 mb-2"
          style={{ margin: "auto", background: "white", padding: 15 }}
        >
          {/* Store Information */}
          <Title
            level={3}
            style={{
              textAlign: "center",
              marginBottom: "0",
            }}
          >
            Pharmacy XYZ
          </Title>
          <Paragraph
            style={{
              textAlign: "center",
              lineHeight: "1.6",
              marginBottom: "0",
            }}
          >
            123 Pharmacy Street, Cityville
          </Paragraph>
          <Paragraph
            style={{
              textAlign: "center",
              lineHeight: "1.6",
              marginBottom: "0",
            }}
          >
            Phone: (123) 456-7890
          </Paragraph>

          {/* Header Text */}
          <Divider className="m-3 ms-0" />
          <Paragraph
            style={{
              lineHeight: "1.6",
              marginBottom: "0",
            }}
          >
            Order Date : {orderReceipt?.orderDate}
          </Paragraph>
          <Paragraph
            style={{
              lineHeight: "1.6",
              marginBottom: "0",
            }}
          >
            Order No : {orderReceipt?.orderNo}
          </Paragraph>
          <Paragraph
            style={{
              marginBottom: "0",
            }}
          >
            Customer Name : {orderReceipt?.customerName}
          </Paragraph>
          <Paragraph
            style={{
              marginBottom: "0",
            }}
          >
            Payment Method : {orderReceipt?.paymentMethod}
          </Paragraph>
          <Divider className="m-3 ms-0" />
          <Row style={{ marginBottom: "8px" }}>
            <Col span={12}>
              <Typography.Text strong>Item Name</Typography.Text>{" "}
            </Col>
            <Col span={6}>
              {" "}
              <Typography.Text strong>QTY</Typography.Text>
            </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <Typography.Text strong>Price</Typography.Text>
            </Col>
          </Row>
          <div style={{ marginBottom: "20px" }}>
            {productList?.map((product) => (
              <div key={product.name} style={{ marginBottom: "8px" }}>
                <Row>
                  <Col span={12}>{product.name}</Col>
                  <Col span={6}>{product.quantity}</Col>
                  <Col span={6} style={{ textAlign: "right" }}>
                    {CURRENCY_SYMBOL} {product.price.toFixed(2)}
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
              <Typography.Text strong>Subtotal</Typography.Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Typography.Text strong>
                {CURRENCY_SYMBOL} {subTotal}
              </Typography.Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Text strong>Discount</Typography.Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Typography.Text strong>
                - {CURRENCY_SYMBOL} {orderReceipt?.discountAmount ?? 0}
              </Typography.Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={5}>Total</Title>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Title level={5}>
                {CURRENCY_SYMBOL} {orderReceipt?.totalPaymentAmount}
              </Title>
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
