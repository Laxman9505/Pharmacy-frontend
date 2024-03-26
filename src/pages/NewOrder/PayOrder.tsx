/** @format */

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  Space,
  Typography,
} from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CURRENCY_SYMBOL,
  ORDER_STATUS,
  VALIDATION_MESSAGE_INPUT,
} from "../../constants/constants";
import useCartActions from "../../hooks/cartActions";
import { CustomerDataModel, PayOrderRequest } from "../../types/order";
import { toNumberAsFixed, toStringAsFixed } from "../../utils/helpers";
import ChooseCustomer from "./ChooseCustomer";

const PayOrder: React.FC<{
  isPayOrderOpen: boolean;
  setIsPayOrderOpen: Dispatch<SetStateAction<boolean>>;
  setIsOrderReceiptOpen: Dispatch<SetStateAction<boolean>>;
  discountAmount: number;
  discountPercentage: number;
  selectedPaymentMethod: string;
  totalPaymentAmount: number;
  orderNo: string;
}> = ({
  isPayOrderOpen,
  setIsPayOrderOpen,
  setIsOrderReceiptOpen,
  totalPaymentAmount,
  discountAmount,
  discountPercentage,
  selectedPaymentMethod,
  orderNo,
}) => {
  const dispatch = useDispatch();
  const [payOrderForm] = Form.useForm();
  const paidAmount = Form.useWatch("paidAmount", payOrderForm);
  const { calculateItemsSubtotal, clearCart } = useCartActions();
  const [isCustomerChoosePopoverOpen, setIsCustomerChoosePopoverOpen] =
    useState<boolean>(false);
  const [customerDataModel, setCustomerDataModel] =
    useState<CustomerDataModel | null>(null);
  const { cartProducts } = useSelector((state: any) => state.cartReducer);
  const { placeOrderLoading, isPlaceOrderSuccess } = useSelector(
    (state: any) => state.ordersReducer
  );
  const subtotalAmount: number = calculateItemsSubtotal();

  const remainingAmount = Number(totalPaymentAmount) - Number(paidAmount);

  const isCompletedOrder = remainingAmount == 0 || remainingAmount < 0.5;

  const handleCancel = () => {
    setIsPayOrderOpen(false);
  };

  useEffect(() => {
    if (customerDataModel) {
      payOrderForm.setFields([
        {
          name: "firstName",
          value: customerDataModel.firstName,
        },
        {
          name: "customerEmail",
          value: customerDataModel.email,
        },
        {
          name: "customerAddress",
          value: customerDataModel.address,
        },
        {
          name: "customerPhone",
          value: customerDataModel.phoneNumber,
        },
      ]);
    }
  }, [customerDataModel]);

  useEffect(() => {
    if (totalPaymentAmount) {
      payOrderForm.setFieldValue(
        "paidAmount",
        toStringAsFixed(totalPaymentAmount)
      );
    }
  }, [totalPaymentAmount]);

  const PayOrderHandler = (values) => {
    const payOrderRequest = {
      orderNo: orderNo,
      discountAmount: toNumberAsFixed(discountAmount),
      discountPercentage: toNumberAsFixed(discountPercentage ?? 0),
      customerDataModel: {
        firstName: values.firstName ?? "",
        lastName: "",
        phoneNumber: values.customerPhone ?? "",
        address: values.customerAddress ?? "",
      },

      totalPaymentAmount: toNumberAsFixed(totalPaymentAmount),
      products: cartProducts?.map((cartProduct, index) => {
        return {
          productId: cartProduct?._id,
          quantity: cartProduct?.quantity,
          boughtPrice: toNumberAsFixed(cartProduct?.price),
          id: "",
        };
      }),
      paidAmount: toNumberAsFixed(paidAmount),
      remainingAmount: toNumberAsFixed(remainingAmount),
      orderDescription: "",
      paymentMethod: selectedPaymentMethod,
      orderStatus: isCompletedOrder
        ? ORDER_STATUS.COMPLETED
        : ORDER_STATUS.PENDING,
    } as PayOrderRequest;

    dispatch({
      type: "PLACE_ORDER_REQUEST",
      payload: payOrderRequest,
    });
    console.log("---values", payOrderRequest);
  };

  useEffect(() => {
    if (isPlaceOrderSuccess) {
      payOrderForm.resetFields();
      clearCart();
      handleCancel();
    }
  }, [isPlaceOrderSuccess]);

  return (
    <>
      <Modal
        title="Pay Order"
        open={isPayOrderOpen}
        onCancel={handleCancel}
        width={"60vw"}
        style={{ top: 20 }}
        footer={null}
      >
        <Form
          form={payOrderForm}
          onFinish={PayOrderHandler}
          variant="filled"
          layout="vertical"
          hideRequiredMark
        >
          <Card
            title={
              <Row align={"middle"}>
                <Col span={4} className="me-2">
                  <Typography.Text strong>Customer Detail</Typography.Text>
                </Col>
                <Col span={19}>
                  <Popover
                    placement="bottomLeft"
                    content={
                      <ChooseCustomer
                        customerDataModel={customerDataModel}
                        setCustomerDataModel={setCustomerDataModel}
                        setIsCustomerChoosePopoverOpen={
                          setIsCustomerChoosePopoverOpen
                        }
                      />
                    }
                    title="Choose Customer"
                    trigger="click"
                    open={isCustomerChoosePopoverOpen}
                    onOpenChange={(e) => setIsCustomerChoosePopoverOpen(e)}
                  >
                    <Typography.Text
                      style={{ cursor: "pointer", fontWeight: "normal" }}
                      underline
                      type="warning"
                    >
                      Choose Existing Customer
                    </Typography.Text>
                  </Popover>
                </Col>
              </Row>
            }
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item hasFeedback name="firstName" label="Customer Name">
                  <Input
                    size="large"
                    placeholder="Please enter customer name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  name="customerEmail"
                  label="Customer Email"
                >
                  <Input
                    size="large"
                    placeholder="Please enter customer email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  name="customerAddress"
                  label="Customer Address"
                >
                  <Input
                    size="large"
                    placeholder="Please enter customer address"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  name="customerPhone"
                  label="Customer Phone"
                >
                  <Input
                    size="large"
                    placeholder="Please enter customer phone"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card
            className="mt-2"
            title={
              <Space>
                <Typography.Text strong>Payment Amount</Typography.Text>
                <Typography.Text strong type="danger" style={{ fontSize: 25 }}>
                  {CURRENCY_SYMBOL} {toStringAsFixed(totalPaymentAmount)}
                </Typography.Text>
              </Space>
            }
          >
            <Form.Item
              hasFeedback
              name="paidAmount"
              label="Paid Amount"
              rules={[
                {
                  required: true,
                  message: VALIDATION_MESSAGE_INPUT,
                },
              ]}
            >
              <Input
                prefix="Rs"
                size="large"
                placeholder="Please enter paid amount"
              />
            </Form.Item>
          </Card>
          <Space className="mt-4">
            <Button
              htmlType="submit"
              type="primary"
              loading={placeOrderLoading}
            >
              Pay Order
            </Button>
            <Button type="primary" danger onClick={handleCancel}>
              Cancel
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default PayOrder;
