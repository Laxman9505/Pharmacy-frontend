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
import { Supplier } from "../../types/supplier";
import AddSupplier from "./AddSupplier";

const Suppliers = () => {
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState<boolean>(false);
  const [activeSupplier, setActiveSupplier] = useState<Supplier | null>(null);
  const dispatch = useDispatch();
  const { allSuppliers, totalSuppliers, isLoading } = useSelector(
    (state: any) => state.supplierReducer
  );

  useEffect(() => {
    dispatch({
      type: "GET_ALL_SUPPLIERS_REQUEST",
      payload: {
        pageSize: 12,
        page: 1,
      },
    });
  }, [dispatch]);

  const columns: TableColumnsType<Supplier> = [
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
    },
    {
      title: "Supplier PAN",
      dataIndex: "supplierPAN",
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
          <Tooltip title="Edit Supplier">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setActiveSupplier(record);
                setIsAddSupplierOpen(true);
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete Supplier">
            <Popconfirm
              title="Delete the supplier"
              description={`Are you sure want to delete ${record.supplierName} ?`}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch({
                  type: "DELETE_SUPPLIER_REQUEST",
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

  const data: Supplier[] = allSuppliers?.map((product: Supplier, index) => {
    return {
      ...product,
      key: index,
    };
  });

  return (
    <AppLayout>
      <AddSupplier
        isAddSupplierOpen={isAddSupplierOpen}
        setIsAddSupplierOpen={setIsAddSupplierOpen}
        setActiveSupplier={setActiveSupplier}
        activeSupplier={activeSupplier}
      />
      <Typography.Title level={4}>Suppliers List</Typography.Title>
      <Card className="mb-4">
        <Row justify="space-between" align={"middle"}>
          <Col span={12}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              size={"large"}
              onClick={() => {
                setIsAddSupplierOpen(true);
              }}
            >
              Add Supplier
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

export default Suppliers;
