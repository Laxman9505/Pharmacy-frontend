/** @format */

import {
  EyeOutlined,
  LoadingOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Segmented,
  Space,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../Layouts/AppLayout";
import { CURRENCY_SYMBOL, DATE_FORMAT } from "../../constants/constants";
import { Order } from "../../types/order";
import OrderDetail from "./Order";

const { Search } = Input;

const Orders = () => {
  const dispatch = useDispatch();
  const { isLoading, totalOrders, allOrders, isCancelOrderSuccess } =
    useSelector((state: any) => state.ordersReducer);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(
      () => {
        dispatch({
          type: "GET_ALL_ORDERS_REQUEST",
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
  }, [searchKeyword, dispatch, currentPage, pageSize, isCancelOrderSuccess]);

  const columns: TableColumnsType<Order> = [
    {
      title: "Order No",
      dataIndex: "orderNo",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      render: (_, record) => (
        <Space size="middle">
          {record.customerDataModel.firstName
            ? `${record.customerDataModel.firstName} ${record.customerDataModel.lastName}`
            : `N/A`}
        </Space>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      render: (_, record) => (
        <Space size="middle">
          {dayjs(record.orderDate).format(DATE_FORMAT)}
        </Space>
      ),
    },
    {
      title: "Amount",
      dataIndex: "totalPaymentAmount",
      render: (_, record) => (
        <Space>
          {" "}
          {record.totalPaymentAmount
            ? `${CURRENCY_SYMBOL} ${record.totalPaymentAmount}`
            : "N/A"}
        </Space>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (_, record) => (
        <Space size="middle">
          {record.orderStatus == "Completed" ? (
            <Tag color="green"> {record.orderStatus}</Tag>
          ) : (
            <Tag color="red">{record.orderStatus}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "isActive",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Order">
            <Button
              type="default"
              icon={<EyeOutlined />}
              onClick={() => {
                setActiveOrder(record.id);
                setIsOrderDetailOpen(true);
              }}
            ></Button>
          </Tooltip>

          <Tooltip title="Print Order">
            <Button icon={<PrinterOutlined />}></Button>
          </Tooltip>
          <Tooltip title="Cancel Order">
            <Popconfirm
              title="Cancel Order"
              description={`Are you sure want to cancel order  ${record.orderNo} ?`}
              icon={<MdOutlineCancel style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch({
                  type: "CANCEL_ORDER_REQUEST",
                  payload: record.id,
                });
              }}
            >
              <Button danger icon={<MdOutlineCancel />}></Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: Order[] = allOrders?.map((order: Order, index) => {
    return {
      ...order,
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
  return (
    <AppLayout>
      <OrderDetail
        setIsOrderDetailOpen={setIsOrderDetailOpen}
        isOrderDetailOpen={isOrderDetailOpen}
        activeOrderId={activeOrder}
      />
      <Typography.Title level={4}>Order List</Typography.Title>
      <Card className="order-container">
        <Row justify="space-between" align={"middle"}>
          <Col span={12}>
            <Segmented<string>
              options={["All Orders", "Completed", "Pending", "Cancelled"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </Col>
          <Col span={12}>
            <Row justify={"end"}>
              <Space>
                <DatePicker
                  width={300}
                  placeholder="Search by order date"
                  height={"40px"}
                />
                <Search
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search by order no"
                  enterButton="Search"
                  size="large"
                />
              </Space>
            </Row>
          </Col>
        </Row>
      </Card>
      <Divider />
      <Spin
        spinning={isLoading}
        indicator={
          <LoadingOutlined style={{ fontSize: 24 }} spin={isLoading} />
        }
      >
        {" "}
        <Table columns={columns} dataSource={data} pagination={false} />
        <Flex justify="end">
          <Pagination
            className="mt-4"
            current={currentPage}
            pageSize={pageSize}
            total={totalOrders}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`
            }
          />
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default Orders;
