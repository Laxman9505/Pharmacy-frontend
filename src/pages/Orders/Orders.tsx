/** @format */

import { PrinterOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Input,
  Row,
  Segmented,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { ReactNode } from "react";
import AppLayout from "../../Layouts/AppLayout";

const { Search } = Input;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  action: ReactNode;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    action: (
      <div>
        <PrinterOutlined />
      </div>
    ),
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",

    action: (
      <div>
        {" "}
        <PrinterOutlined />
      </div>
    ),
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    action: (
      <div>
        {" "}
        <PrinterOutlined />
      </div>
    ),
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
    action: (
      <div>
        {" "}
        <PrinterOutlined />
      </div>
    ),
  },
];

const Orders = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <AppLayout>
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
                  onChange={onChange}
                />
                <Search
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
      <Table columns={columns} dataSource={data} />
    </AppLayout>
  );
};

export default Orders;
