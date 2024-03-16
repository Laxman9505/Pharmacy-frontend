/** @format */

import { Button, Col, Drawer, Form, Input, Row, Space, Switch } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VALIDATION_MESSAGE_INPUT } from "../../constants/constants";
import { ProductCategory } from "../../types/inventory";

const AddProductCategories: React.FC<{
  isAddProductCategoryOpen: boolean;
  setIsAddProductCategoryOpen: Dispatch<SetStateAction<boolean>>;
  activeProductCategory: ProductCategory | null;
  setActiveProductCategory: Dispatch<SetStateAction<ProductCategory | null>>;
}> = ({
  isAddProductCategoryOpen,
  setIsAddProductCategoryOpen,
  setActiveProductCategory,
  activeProductCategory,
}) => {
  const [addProductCategoryForm] = Form.useForm();
  const dispatch = useDispatch();
  const { addLoading, addSuccess, isDeleteSuccess } = useSelector(
    (state: any) => state.inventoryReducer
  );

  const onAddProductCategoryHandler = (values: ProductCategory) => {
    dispatch({
      type: "ADD_PRODUCT_CATEGORY_REQUEST",
      payload: { ...values, id: activeProductCategory?.id ?? "" },
    });
  };

  useEffect(() => {
    if (addSuccess || isDeleteSuccess) {
      setActiveProductCategory(null);
      addProductCategoryForm.resetFields();
      setIsAddProductCategoryOpen(false);
      dispatch({
        type: "GET_ALL_PRODUCT_CATEGORIES_REQUEST",
        payload: {
          pageSize: 12,
          page: 1,
        },
      });
    }
  }, [addSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (activeProductCategory) {
      addProductCategoryForm.setFields([
        {
          name: "categoryName",
          value: activeProductCategory.categoryName,
        },
        {
          name: "description",
          value: activeProductCategory.description,
        },
        {
          name: "isActive",
          value: activeProductCategory.isActive,
        },
      ]);
    }
  }, [activeProductCategory]);
  return (
    <Drawer
      title="Add a Product Category"
      width={"60vw"}
      onClose={() => {
        setActiveProductCategory(null);
        setIsAddProductCategoryOpen(false);
        addProductCategoryForm.resetFields();
      }}
      open={isAddProductCategoryOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        form={addProductCategoryForm}
        variant="filled"
        onFinish={onAddProductCategoryHandler}
        layout="vertical"
        initialValues={{}}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="categoryName"
              label="Category Name"
              rules={[{ required: true, message: VALIDATION_MESSAGE_INPUT }]}
            >
              <Input size="large" placeholder="Please enter category name" />
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

        <Row gutter={12}>
          <Col span={24}>
            <Form.Item hasFeedback name="description" label="Description">
              <Input.TextArea rows={4} placeholder="please enter description" />
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
                setActiveProductCategory(null);
                setIsAddProductCategoryOpen(false);
                addProductCategoryForm.resetFields();
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

export default AddProductCategories;
