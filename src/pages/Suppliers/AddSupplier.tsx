/** @format */

import { Button, Col, Drawer, Form, Input, Row, Space, Switch } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VALIDATION_MESSAGE_INPUT } from "../../constants/constants";
import { Supplier } from "../../types/supplier";

const AddSupplier: React.FC<{
  isAddSupplierOpen: boolean;
  setIsAddSupplierOpen: Dispatch<SetStateAction<boolean>>;
  activeSupplier: Supplier | null;
  setActiveSupplier: Dispatch<SetStateAction<Supplier | null>>;
  page: number;
  pageSize: number;
}> = ({
  isAddSupplierOpen,
  setIsAddSupplierOpen,
  activeSupplier,
  setActiveSupplier,
  page,
  pageSize,
}) => {
  const [addSupplierForm] = Form.useForm();
  const dispatch = useDispatch();
  const { addLoading, addSuccess, isDeleteSuccess } = useSelector(
    (state: any) => state.supplierReducer
  );

  const onAddSupplierHandler = (values: Supplier) => {
    dispatch({
      type: "ADD_SUPPLIER_REQUEST",
      payload: { ...values, id: activeSupplier?.id ?? "" },
    });
  };

  useEffect(() => {
    if (addSuccess || isDeleteSuccess) {
      setActiveSupplier(null);
      addSupplierForm.resetFields();
      setIsAddSupplierOpen(false);
      dispatch({
        type: "GET_ALL_SUPPLIERS_REQUEST",
        payload: {
          pageSize: pageSize,
          page: page,
        },
      });
    }
  }, [addSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (activeSupplier) {
      addSupplierForm.setFields([
        {
          name: "supplierName",
          value: activeSupplier.supplierName,
        },
        {
          name: "description",
          value: activeSupplier.description,
        },
        {
          name: "supplierPAN",
          value: activeSupplier.supplierPAN,
        },
        {
          name: "isActive",
          value: activeSupplier.isActive,
        },
      ]);
    }
  }, [activeSupplier]);
  return (
    <Drawer
      title="Add a Supplier"
      width={"60vw"}
      onClose={() => {
        setActiveSupplier(null);
        setIsAddSupplierOpen(false);
        addSupplierForm.resetFields();
      }}
      open={isAddSupplierOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        form={addSupplierForm}
        variant="filled"
        onFinish={onAddSupplierHandler}
        layout="vertical"
        initialValues={{}}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="supplierName"
              label="Supplier Name"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Input size="large" placeholder="Please enter supplier name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="supplierPAN"
              label="Supplier PAN"
              //   rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Input size="large" placeholder="Please enter supplier pan" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item hasFeedback name="description" label="Description">
              <Input.TextArea rows={4} placeholder="please enter description" />
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
        <Row>
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
                setActiveSupplier(null);
                setIsAddSupplierOpen(false);
                addSupplierForm.resetFields();
              }}
            >
              Cancel
            </Button>
          </Space>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddSupplier;
