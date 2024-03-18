/** @format */

import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AppLayout from "../../Layouts/AppLayout";

import type { TableColumnsType } from "antd";
import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DATE_FORMAT } from "../../constants/constants";
import { Product } from "../../types/inventory";
import AddProduct from "./AddProduct";

const { Search } = Input;

const Inventory = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const dispatch = useDispatch();
  const { allProducts, totalProducts, isLoading } = useSelector(
    (state: any) => state.inventoryReducer
  );

  useEffect(() => {
    const handler = setTimeout(
      () => {
        dispatch({
          type: "GET_ALL_PRODUCTS_REQUEST",
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

  const columns: TableColumnsType<Product> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (_, record) => <Space> {record?.category?.categoryName}</Space>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (_, record) => (
        <Space> {record.price ? `Rs ${record.price}` : "N/A"}</Space>
      ),
    },
    {
      title: "Stock",
      dataIndex: "quantityInStock",
      render: (_, record) => (
        <Space size="middle">
          {<Tag color="green">{record.quantityInStock}</Tag>}
        </Space>
      ),
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
    },
    {
      title: "MFG Date",
      dataIndex: "manufactureDate",
      render: (_, record) => (
        <Space size="middle">
          {dayjs(record.manufactureDate).format(DATE_FORMAT)}
        </Space>
      ),
    },
    {
      title: "EXP Date",
      dataIndex: "expirationDate",
      render: (_, record) => (
        <Space size="middle">
          {dayjs(record.expirationDate).format(DATE_FORMAT)}
        </Space>
      ),
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
                setActiveProduct(record);
                setIsAddProductOpen(true);
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete Product">
            <Popconfirm
              title="Delete the product"
              description={`Are you sure want to delete ${record.name} ?`}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PRODUCT_REQUEST",
                  payload: record._id,
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

  const data: Product[] = allProducts?.map((product: Product, index) => {
    return {
      ...product,
      key: index,
    };
  });

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(currentPage);
    setPageSize(size);
  };

  console.log("--all products", allProducts);

  return (
    <AppLayout>
      <AddProduct
        isAddProductOpen={isAddProductOpen}
        setIsAddProductOpen={setIsAddProductOpen}
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
        page={currentPage}
        pageSize={pageSize}
      />{" "}
      <Typography.Title level={4}>Product List</Typography.Title>
      <Card className="mb-4">
        <Row justify="space-between" align={"middle"}>
          <Col span={12}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              size={"large"}
              onClick={() => {
                setIsAddProductOpen(true);
              }}
            >
              Add Product
            </Button>
          </Col>
          <Col span={12}>
            <Row justify={"end"}>
              <Space>
                <Search
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search by product "
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
            total={totalProducts}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} products`
            }
          />
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default Inventory;
