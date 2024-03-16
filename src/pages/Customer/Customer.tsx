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
import { Customer } from "../../types/customer";
import AddCustomer from "./AddCustomer";

const Customers = () => {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const dispatch = useDispatch();
  const { allCustomers, totalCustomers, isLoading } = useSelector(
    (state: any) => state.inventoryReducer
  );

  useEffect(() => {
    dispatch({
      type: "GET_ALL_CUSTOMERS_REQUEST",
      payload: {
        pageSize: 12,
        page: 1,
      },
    });
  }, [dispatch]);

  const columns: TableColumnsType<Customer> = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
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
          <Tooltip title="Edit Customer">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setActiveCustomer(record);
                setIsAddCustomerOpen(true);
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete Customer">
            <Popconfirm
              title="Delete the Customer"
              description={`Are you sure want to delete ${record.firstName} ?`}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch({
                  type: "DELETE_CUSTOMER_REQUEST",
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

  const data: Customer[] = allCustomers?.map((customer: Customer, index) => {
    return {
      ...customer,
      key: index,
    };
  });

  return (
    <AppLayout>
      <AddCustomer
        isAddCustomerOpen={isAddCustomerOpen}
        setIsAddCustomerOpen={setIsAddCustomerOpen}
        setActiveCustomer={setActiveCustomer}
        activeCustomer={activeCustomer}
      />
      <Typography.Title level={4}>Customers List</Typography.Title>
      <Card className="mb-4">
        <Row justify="space-between" align={"middle"}>
          <Col span={12}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              size={"large"}
              onClick={() => {
                setIsAddCustomerOpen(true);
              }}
            >
              Add Customer
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

export default Customers;
