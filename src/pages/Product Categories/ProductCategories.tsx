/** @format */

import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../Layouts/AppLayout";
import { ProductCategory } from "../../types/inventory";
import AddProductCategories from "./AddProductCategories";

const ProductCategories = () => {
  const [isAddProductCategoryOpen, setIsAddProductCategoryOpen] =
    useState<boolean>(false);
  const [activeProductCategory, setActiveProductCategory] =
    useState<ProductCategory | null>(null);
  const dispatch = useDispatch();
  const { allProductCategories, totalProductCategories, isLoading } =
    useSelector((state: any) => state.inventoryReducer);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_PRODUCT_CATEGORIES_REQUEST",
      payload: {
        pageSize: 12,
        page: 1,
      },
    });
  }, [dispatch]);

  const columns: TableColumnsType<ProductCategory> = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Is Active",
      dataIndex: "isActive",
      render: (_, record) => (
        <Space size="middle">
          {record.isActive ? (
            <Tag color="green"> Active</Tag>
          ) : (
            <Tag color="red">Not-Active</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "isActive",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Product">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setActiveProductCategory(record);
                setIsAddProductCategoryOpen(true);
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete Product">
            <Popconfirm
              title="Delete the product"
              description={`Are you sure want to delete ${record.categoryName} ?`}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PRODUCT_CATEGORY_REQUEST",
                  payload: record.id,
                });
              }}
            >
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: ProductCategory[] = allProductCategories?.map(
    (product: ProductCategory, index) => {
      return {
        ...product,
        key: index,
      };
    }
  );

  return (
    <AppLayout>
      <AddProductCategories
        isAddProductCategoryOpen={isAddProductCategoryOpen}
        setIsAddProductCategoryOpen={setIsAddProductCategoryOpen}
        setActiveProductCategory={setActiveProductCategory}
        activeProductCategory={activeProductCategory}
      />
      <Typography.Title level={4}>Categories List</Typography.Title>
      <Card className="mb-4">
        <Row justify="space-between" align={"middle"}>
          <Col span={12}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              size={"large"}
              onClick={() => {
                setIsAddProductCategoryOpen(true);
              }}
            >
              Add Categories
            </Button>
          </Col>
        </Row>
      </Card>
      <Spin
        spinning={isLoading}
        indicator={
          <LoadingOutlined style={{ fontSize: 24 }} spin={isLoading} />
        }
      >
        <Table columns={columns} dataSource={data} />
      </Spin>
    </AppLayout>
  );
};

export default ProductCategories;
