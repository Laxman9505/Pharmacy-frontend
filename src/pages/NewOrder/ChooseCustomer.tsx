/** @format */

import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Pagination,
  Space,
  Spin,
  Table,
  TableColumnsType,
} from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Customer } from "../../types/customer";
import { CustomerDataModel } from "../../types/order";

const ChooseCustomer: React.FC<{
  customerDataModel: CustomerDataModel | null;
  setCustomerDataModel: Dispatch<SetStateAction<CustomerDataModel | null>>;
  setIsCustomerChoosePopoverOpen: Dispatch<SetStateAction<boolean>>;
}> = ({
  customerDataModel,
  setCustomerDataModel,
  setIsCustomerChoosePopoverOpen,
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { allCustomers, totalCustomers, isLoading } = useSelector(
    (state: any) => state.customerReducer
  );
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
      title: "Action",
      dataIndex: "isActive",
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            onClick={() => {
              setCustomerDataModel(record as any);
              setIsCustomerChoosePopoverOpen(false);
            }}
          >
            Choose
          </Button>
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

  useEffect(() => {
    const handler = setTimeout(
      () => {
        dispatch({
          type: "GET_ALL_CUSTOMERS_REQUEST",
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

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(currentPage);
    setPageSize(size);
  };
  return (
    <Spin
      spinning={isLoading}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin={isLoading} />}
    >
      <Table columns={columns} dataSource={data} pagination={false} />
      <Flex justify="end">
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={totalCustomers}
          onChange={handlePageChange}
          onShowSizeChange={handlePageSizeChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "50", "100"]}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} customers`
          }
        />
      </Flex>
    </Spin>
  );
};

export default ChooseCustomer;
