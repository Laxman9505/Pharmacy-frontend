/** @format */

import { Card, Col, Form, Input, Modal, Row } from "antd";
import React, { Dispatch, SetStateAction } from "react";

const PayOrder: React.FC<{
  isPayOrderOpen: boolean;
  setIsPayOrderOpen: Dispatch<SetStateAction<boolean>>;
  setIsOrderReceiptOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isPayOrderOpen, setIsPayOrderOpen, setIsOrderReceiptOpen }) => {
  const handleCancel = () => {
    setIsPayOrderOpen(false);
  };

  return (
    <>
      <Modal
        title="Pay Order"
        open={isPayOrderOpen}
        onOk={() => {
          setIsPayOrderOpen(false);
          setIsOrderReceiptOpen(true);
        }}
        onCancel={handleCancel}
        okText="Pay Now"
        width={"60vw"}
        style={{ top: 20 }}
      >
        <Form variant="filled" layout="vertical" hideRequiredMark>
          <Card title="Customer Details">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  name="customerName"
                  label="Customer Name"
                >
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
          <Card className="mt-2" title="Payment Amount">
            <Form.Item hasFeedback name="paidAmount" label="Paid Amount">
              <Input
                prefix="Rs"
                size="large"
                placeholder="Please enter paid amount"
              />
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default PayOrder;
