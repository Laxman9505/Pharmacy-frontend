/** @format */

import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import AppLayout from "../../Layouts/AppLayout";
import { VALIDATION_MESSAGE_INPUT } from "../../constants/constants";

const StoreSettings = () => {
  const onUpdateStoreSettingsHandler = () => {};
  return (
    <AppLayout>
      <Typography.Title level={4}>Store Settings</Typography.Title>
      <Card className="mb-4">
        <Form
          variant="filled"
          onFinish={onUpdateStoreSettingsHandler}
          layout="vertical"
          hideRequiredMark
        >
          <Typography.Title level={5}>Store Information</Typography.Title>
          <Divider className="m-3 ms-0" />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="name"
                label="Store Name"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input size="large" placeholder="Please enter store name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="location"
                label="Store Location"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input size="large" placeholder="Please enter store location" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="phoneNumber"
                label="Store Phone Number"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input
                  size="large"
                  placeholder="Please enter store phone number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="email"
                label="Store Email"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input size="large" placeholder="Please enter store email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="currencySymbol"
                label="Currency Symbol"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input
                  size="large"
                  placeholder="Please enter currency symbol"
                />
              </Form.Item>
            </Col>
          </Row>
          <Typography.Title level={5}>Receipt Configuration</Typography.Title>
          <Divider className="m-3 ms-0" />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="receiptHeaderText"
                label="Header Text"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input
                  size="large"
                  placeholder="Please enter header text for receipt"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="receiptFooterText"
                label="Footer Text"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input
                  size="large"
                  placeholder="Please enter footer text for receipt"
                />
              </Form.Item>
            </Col>
          </Row>
          <Typography.Title level={5}>Printer Configuration</Typography.Title>
          <Divider className="m-3 ms-0" />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="printerName"
                label="Printer Name"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input size="large" placeholder="Please enter printer name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="paperSize"
                label="Paper Size"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input size="large" placeholder="Please enter paper size" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="printerIPAddress"
                label="Printer IP Address"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input
                  size="large"
                  placeholder="Please enter printer ip address"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="port"
                label="Port"
                rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
              >
                <Input size="large" placeholder="Please enter port" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Space>
              <Button htmlType="submit" type="primary" size="large">
                Submit
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </AppLayout>
  );
};

export default StoreSettings;
