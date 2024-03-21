/** @format */

import { Button, Col, Drawer, Form, Input, Row, Space, Switch } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VALIDATION_MESSAGE_INPUT } from "../../constants/constants";
import { Customer } from "../../types/customer";

const AddCustomer: React.FC<{
  isAddCustomerOpen: boolean;
  setIsAddCustomerOpen: Dispatch<SetStateAction<boolean>>;
  activeCustomer: Customer | null;
  setActiveCustomer: Dispatch<SetStateAction<Customer | null>>;
  page: number;
  pageSize: number;
}> = ({
  isAddCustomerOpen,
  setIsAddCustomerOpen,
  activeCustomer,
  setActiveCustomer,
  page,
  pageSize,
}) => {
  const [addCustomerForm] = Form.useForm();
  const dispatch = useDispatch();
  const { addLoading, addSuccess, isDeleteSuccess } = useSelector(
    (state: any) => state.customerReducer
  );

  const onAddCustomerHandler = (values: Customer) => {
    dispatch({
      type: "ADD_CUSTOMER_REQUEST",
      payload: { ...values, id: activeCustomer?.id ?? "" },
    });
  };

  useEffect(() => {
    if (addSuccess || isDeleteSuccess) {
      setActiveCustomer(null);
      addCustomerForm.resetFields();
      setIsAddCustomerOpen(false);
      dispatch({
        type: "GET_ALL_CUSTOMERS_REQUEST",
        payload: {
          pageSize: pageSize,
          page: page,
        },
      });
    }
  }, [addSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (activeCustomer) {
      addCustomerForm.setFields([
        {
          name: "firstName",
          value: activeCustomer.firstName,
        },
        {
          name: "lastName",
          value: activeCustomer.lastName,
        },
        {
          name: "email",
          value: activeCustomer.email,
        },
        {
          name: "phoneNumber",
          value: activeCustomer.phoneNumber,
        },
        {
          name: "address",
          value: activeCustomer.address,
        },
        {
          name: "isActive",
          value: activeCustomer.isActive,
        },
      ]);
    }
  }, [activeCustomer]);
  return (
    <Drawer
      title="Add a Customer"
      width={"80vw"}
      onClose={() => {
        setActiveCustomer(null);
        setIsAddCustomerOpen(false);
        addCustomerForm.resetFields();
      }}
      open={isAddCustomerOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        form={addCustomerForm}
        variant="filled"
        onFinish={onAddCustomerHandler}
        layout="vertical"
        initialValues={{}}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Input size="large" placeholder="Please enter first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback name={"lastName"} label="Last Name">
              <Input size="large" placeholder="Please enter last name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="email"
              label="Email"
              rules={[{ type: "email", message: "Email should be valid !" }]}
            >
              <Input size="large" placeholder="Please enter email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback name={"phoneNumber"} label="Phone Number">
              <Input size="large" placeholder="Please enter phone" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item hasFeedback name={"address"} label="Address">
              <Input size="large" placeholder="Please enter address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={true}
              hasFeedback
              name={"isActive"}
              label="Status"
            >
              <Switch defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Button
            loading={addLoading}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Submit
          </Button>
          <Button
            size="large"
            type="default"
            onClick={() => {
              setActiveCustomer(null);
              setIsAddCustomerOpen(false);
              addCustomerForm.resetFields();
            }}
          >
            Cancel
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default AddCustomer;
