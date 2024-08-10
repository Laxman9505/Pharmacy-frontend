/** @format */

import { PrinterOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Flex,
  Input,
  Row,
  Typography,
} from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [customOrderData, setCustomOrderDate] = useState<any>();
  const orderReceipt = placeOrderResponse?.receipt;
  const storeDetail = placeOrderResponse?.storeDetail;

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

  useEffect(() => {
    if (orderReceipt?.orderDate) {
      setCustomOrderDate(orderReceipt?.orderDate);
    }
  }, [orderReceipt]);
  return (
    <>
      <Drawer
        title="Payment Reciept"
        onClose={() => {
          dispatch({ type: "CLEAR_ORDER_REDUCER" });
          setIsOrderReceiptOpen(false);
        }}
        open={isOrderReceiptOpen}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ background: THEME_COLOR, padding: 15 }}>
          <div className="bg-white p-3">
            {/* Store Information */}
            <Title
              level={3}
              style={{
                textAlign: "center",
                marginBottom: "0",
              }}
            >
              {storeDetail?.storeDetails?.name}
            </Title>
            <Paragraph
              style={{
                textAlign: "center",
                lineHeight: "1.6",
                marginBottom: "0",
              }}
            >
              {storeDetail?.storeDetails?.location}
            </Paragraph>
            <Paragraph
              style={{
                textAlign: "center",
                lineHeight: "1.6",
                marginBottom: "0",
              }}
            >
              Phone: {storeDetail?.storeDetails?.phoneNumber}
            </Paragraph>
            {storeDetail?.receiptConfiguration?.receiptHeaderText && (
              <Flex justify="center" align="center">
                <Typography.Text strong className="mt-2">
                  {storeDetail?.receiptConfiguration?.receiptHeaderText}
                </Typography.Text>
              </Flex>
            )}{" "}
            {/* Header Text */}
            <Divider className="m-3 ms-0" />
            <Paragraph
              style={{
                lineHeight: "1.6",
                marginBottom: "0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span> Order Date : </span>
                <Input
                  style={{ height: "30px" }}
                  value={customOrderData}
                  onChange={(e) => setCustomOrderDate(e.target.value)}
                />{" "}
              </div>
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
            {storeDetail?.receiptConfiguration?.receiptFooterText && (
              <Paragraph style={{ textAlign: "center", marginTop: "16px" }}>
                {storeDetail?.receiptConfiguration?.receiptFooterText}
              </Paragraph>
            )}
          </div>
          <Flex className="mt-2" justify="center">
            <Button
              onClick={() => {
                dispatch({
                  type: "PRINT_REQUEST",
                  payload: {
                    ...placeOrderResponse,
                    receipt: {
                      ...orderReceipt,
                      orderDate: customOrderData,
                    },
                  },
                });
              }}
              icon={<PrinterOutlined />}
              style={{ color: "black" }}
            >
              Print Receipt
            </Button>
          </Flex>
        </div>
      </Drawer>
    </>
  );
};

export default OrderReciept;
