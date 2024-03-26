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
  Spin,
  Typography,
} from "antd";
import AppLayout from "../../Layouts/AppLayout";
import { VALIDATION_MESSAGE_INPUT } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const StoreSettings = () => {
  const dispatch = useDispatch();
  const [storeSettingsForm] = Form.useForm();
  const { storeDetail, isLoading, saveSuccess, saveLoading } = useSelector(
    (state: any) => state.storeReducer
  );

  useEffect(() => {
    dispatch({
      type: "GET_STORE_DETAIL_REQUEST",
    });
  }, [saveSuccess]);

  useEffect(() => {
    if (storeDetail) {
      storeSettingsForm.setFields([
        {
          name: "name",
          value: storeDetail?.storeDetails?.name,
        },
        {
          name: "location",
          value: storeDetail?.storeDetails?.location,
        },
        {
          name: "phoneNumber",
          value: storeDetail?.storeDetails?.phoneNumber,
        },
        {
          name: "email",
          value: storeDetail?.storeDetails?.email,
        },
        {
          name: "currencySymbol",
          value: storeDetail?.storeDetails?.currencySymbol,
        },
        {
          name: "receiptHeaderText",
          value: storeDetail?.receiptConfiguration?.receiptHeaderText,
        },
        {
          name: "receiptFooterText",
          value: storeDetail?.receiptConfiguration?.receiptFooterText,
        },
        {
          name: "printerName",
          value: storeDetail?.printerConfiguration?.printerName,
        },
        {
          name: "printerIPAddress",
          value: storeDetail?.printerConfiguration?.printerIPAddress,
        },
        {
          name: "paperSize",
          value: storeDetail?.printerConfiguration?.paperSize,
        },
        {
          name: "port",
          value: storeDetail?.printerConfiguration?.port,
        },
      ]);
    }
  }, [storeDetail, storeSettingsForm]);

  const onUpdateStoreSettingsHandler = (values) => {
    dispatch({
      type: "SAVE_STORE_DETAIL_REQUEST",
      payload: {
        ...values,
        receiptConfiguration: {
          receiptHeaderText: values.receiptHeaderText,
          receiptFooterText: values.receiptFooterText,
        },
        printerConfiguration: {
          printerName: values.printerName,
          paperSize: values.paperSize,
          printerIPAddress: values.printerIPAddress,
          port: values.port,
        },
      },
    });
  };

  return (
    <AppLayout>
      <Typography.Title level={4}>Store Settings</Typography.Title>
      <Card className="mb-4">
        <Spin spinning={isLoading}>
          <Form
            variant="filled"
            onFinish={onUpdateStoreSettingsHandler}
            layout="vertical"
            hideRequiredMark
            form={storeSettingsForm}
          >
            <Typography.Title level={5}>Store Information</Typography.Title>
            <Divider className="m-3 ms-0" />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  name="name"
                  label="Store Name"
                  rules={[
                    { required: true, message: VALIDATION_MESSAGE_INPUT },
                  ]}
                >
                  <Input size="large" placeholder="Please enter store name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  name="location"
                  label="Store Location"
                  rules={[
                    { required: true, message: VALIDATION_MESSAGE_INPUT },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Please enter store location"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  name="phoneNumber"
                  label="Store Phone Number"
                  rules={[
                    { required: true, message: VALIDATION_MESSAGE_INPUT },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Please enter store phone number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item hasFeedback name="email" label="Store Email">
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
                  rules={[
                    { required: true, message: VALIDATION_MESSAGE_INPUT },
                  ]}
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
                <Form.Item hasFeedback name="printerName" label="Printer Name">
                  <Input size="large" placeholder="Please enter printer name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item hasFeedback name="paperSize" label="Paper Size">
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
                  rules={[
                    { required: true, message: VALIDATION_MESSAGE_INPUT },
                  ]}
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
                  rules={[
                    { required: true, message: VALIDATION_MESSAGE_INPUT },
                  ]}
                >
                  <Input size="large" placeholder="Please enter port" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Space>
                <Button
                  loading={saveLoading}
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Space>
            </Row>
          </Form>
        </Spin>
      </Card>
    </AppLayout>
  );
};

export default StoreSettings;
