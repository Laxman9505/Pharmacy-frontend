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
  Flex,
  Pagination,
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
import Search from "antd/es/input/Search";
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
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const { allProductCategories, totalProductCategories, isLoading } =
    useSelector((state: any) => state.inventoryReducer);

  useEffect(() => {
    const handler = setTimeout(
      () => {
        dispatch({
          type: "GET_ALL_PRODUCT_CATEGORIES_REQUEST",
          payload: {
            pageSize: pageSize,
            page: currentPage,
            searchKeyword: searchKeyword,
          },
        });
      },
      searchKeyword ? 1000 : 0
    );

    return () => {
      clearTimeout(handler);
    };
  }, [searchKeyword, dispatch, currentPage, pageSize]);

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

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(currentPage);
    setPageSize(size);
  };

  return (
    <AppLayout>
      <AddProductCategories
        isAddProductCategoryOpen={isAddProductCategoryOpen}
        setIsAddProductCategoryOpen={setIsAddProductCategoryOpen}
        setActiveProductCategory={setActiveProductCategory}
        activeProductCategory={activeProductCategory}
        page={currentPage}
        pageSize={pageSize}
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
          <Col span={12}>
            <Row justify={"end"}>
              <Space>
                <Search
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search by category "
                  enterButton="Search"
                  size="large"
                />
              </Space>
            </Row>
          </Col>
        </Row>
      </Card>
      <Spin
        spinning={isLoading}
        indicator={
          <LoadingOutlined style={{ fontSize: 24 }} spin={isLoading} />
        }
      >
        <Table columns={columns} dataSource={data} pagination={false} />
        <Flex justify="end">
          <Pagination
            className="mt-4"
            current={currentPage}
            pageSize={pageSize}
            total={totalProductCategories}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} categories`
            }
          />
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default ProductCategories;
