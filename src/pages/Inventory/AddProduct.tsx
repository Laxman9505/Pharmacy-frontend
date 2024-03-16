/** @format */

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DATE_FORMAT,
  VALIDATION_MESSAGE_INPUT,
} from "../../constants/constants";
import { Product } from "../../types/inventory";

const { Option } = Select;

const dateFormat = DATE_FORMAT;

const AddProduct: React.FC<{
  isAddProductOpen: boolean;
  setIsAddProductOpen: Dispatch<SetStateAction<boolean>>;
  activeProduct: Product | null;
  setActiveProduct: Dispatch<SetStateAction<Product | null>>;
}> = ({
  isAddProductOpen,
  setIsAddProductOpen,
  activeProduct,
  setActiveProduct,
}) => {
  const dispatch = useDispatch();
  const [addProductForm] = Form.useForm();
  const { addLoading, addSuccess, isDeleteSuccess, addProductData } =
    useSelector((state: any) => state.inventoryReducer);
  const onAddProductHandler = (values) => {
    const addProductPayload = {
      ...values,
      manufactureDate: dayjs(values.manufactureDate).format("YYYY-MM-DD"),
      expirationDate: dayjs(values.expirationDate).format("YYYY-MM-DD"),
      id: activeProduct ? activeProduct._id : "",
    };

    dispatch({
      type: "ADD_PRODUCT_REQUEST",
      payload: addProductPayload,
    });
  };

  useEffect(() => {
    if (addSuccess || isDeleteSuccess) {
      setActiveProduct(null);
      addProductForm.resetFields();
      setIsAddProductOpen(false);
      dispatch({
        type: "GET_ALL_PRODUCTS_REQUEST",
        payload: {
          pageSize: 12,
          page: 1,
        },
      });
    }
  }, [addSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (isAddProductOpen) {
      dispatch({
        type: "GET_ADD_PRODUCT_DATA_REQUEST",
      });
    }
  }, [isAddProductOpen]);

  useEffect(() => {
    if (activeProduct) {
      addProductForm.setFields([
        {
          name: "name",
          value: activeProduct.name,
        },
        {
          name: "category",
          value: activeProduct?.category?.id,
        },
        {
          name: "manufacturer",
          value: activeProduct.manufacturer,
        },
        {
          name: "manufactureDate",
          value: dayjs(activeProduct.manufactureDate),
        },
        {
          name: "expirationDate",
          value: dayjs(activeProduct.expirationDate),
        },
        {
          name: "formulation",
          value: activeProduct.formulation,
        },
        {
          name: "strength",
          value: activeProduct.strength,
        },
        {
          name: "reorderLevel",
          value: activeProduct.reorderLevel,
        },
        {
          name: "quantityInStock",
          value: activeProduct.quantityInStock,
        },
        {
          name: "barcode",
          value: activeProduct.barcode,
        },
        {
          name: "buyingPrice",
          value: activeProduct.buyingPrice,
        },
        {
          name: "price",
          value: activeProduct.price,
        },
        {
          name: "description",
          value: activeProduct.description,
        },
        {
          name: "isActive",
          value: activeProduct.isActive,
        },
      ]);
    }
  }, [activeProduct]);

  console.log("---active product", activeProduct);
  return (
    <Drawer
      title="Add a new product"
      width={"85vw"}
      onClose={() => {
        setActiveProduct(null);
        setIsAddProductOpen(false);
        addProductForm.resetFields();
      }}
      open={isAddProductOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        form={addProductForm}
        variant="filled"
        onFinish={onAddProductHandler}
        layout="vertical"
        initialValues={{}}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="name"
              label="Name"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Input size="large" placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="category"
              label="Category"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Select size="large" placeholder="Please select a category">
                {addProductData?.productCategories?.map((category, index) => {
                  return (
                    <Option value={category?.id} key={index}>
                      {category?.categoryName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="manufacturer"
              label="Manufacturer"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Input
                size="large"
                placeholder="Please enter manufacturer name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="manufactureDate"
              label="Manufacturer Date"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <DatePicker
                placeholder="Select Manufacture Date"
                format={dateFormat}
                size="large"
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentElement!}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="expirationDate"
              label="Expiration Date"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <DatePicker
                placeholder="Select Expiration Date"
                format={dateFormat}
                size="large"
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentElement!}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="formulation"
              label="Formulation"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Input
                size="large"
                placeholder="Please enter formulation of product"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="strength"
              label="Strength"
              rules={[
                {
                  required: true,
                  message: VALIDATION_MESSAGE_INPUT,
                },
              ]}
            >
              <Input size="large" placeholder="please enter strength" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="reorderLevel"
              label="Re-order Level"
              rules={[
                {
                  required: true,
                  message: VALIDATION_MESSAGE_INPUT,
                },
              ]}
            >
              <InputNumber
                className="w-100"
                size="large"
                placeholder="please enter re-order level"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="quantityInStock"
              label="Quantity In Stock"
              rules={[
                {
                  required: true,
                  message: VALIDATION_MESSAGE_INPUT,
                },
              ]}
            >
              <InputNumber
                className="w-100"
                size="large"
                placeholder="please enter quantity in stock"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="barcode"
              label="Barcode number"
              rules={[
                {
                  required: true,
                  message: VALIDATION_MESSAGE_INPUT,
                },
              ]}
            >
              <InputNumber
                className="w-100"
                size="large"
                placeholder="please enter barcode number"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="buyingPrice"
              label="Buying Price"
              rules={[
                {
                  required: true,
                  message: VALIDATION_MESSAGE_INPUT,
                },
              ]}
            >
              <InputNumber
                prefix="Rs"
                className="w-100"
                size="large"
                placeholder="please enter buying price"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="price"
              label="Selling Price"
              rules={[
                {
                  required: true,
                  message: VALIDATION_MESSAGE_INPUT,
                },
              ]}
            >
              <InputNumber
                prefix="Rs"
                className="w-100"
                size="large"
                placeholder="please enter selling price"
              />
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
                setActiveProduct(null);
                setIsAddProductOpen(false);
                addProductForm.resetFields();
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

export default AddProduct;
