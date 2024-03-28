/** @format */

import { Col, Divider, List, Modal, Row, Spin, Typography } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCY_SYMBOL } from "../../constants/constants";

const OrderDetail: React.FC<{
  isOrderDetailOpen: boolean;
  setIsOrderDetailOpen: Dispatch<SetStateAction<boolean>>;
  activeOrderId: string;
}> = ({ isOrderDetailOpen, setIsOrderDetailOpen, activeOrderId }) => {
  const dispatch = useDispatch();
  const { orderDetails, getOrderDetailLoading } = useSelector(
    (state: any) => state.ordersReducer
  );

  useEffect(() => {
    if (activeOrderId) {
      dispatch({ type: "GET_ORDER_DETAIL_REQUEST", payload: activeOrderId });
    }
  }, [activeOrderId]);

  console.log("--order details", orderDetails);

  return (
    <Modal
      title="Order Detail"
      open={isOrderDetailOpen}
      onCancel={() => setIsOrderDetailOpen(false)}
      style={{ top: 20 }}
      footer={null}
    >
      <Spin spinning={getOrderDetailLoading}>
        <Divider className="m-1 ms-0 mb-3" />
        {/* <Typography.Title level={5} style={{ color: THEME_COLOR }}>
          Product Details
        </Typography.Title> */}
        <Row>
          <Col span={12}>
            <Typography.Text strong> Name</Typography.Text>
          </Col>
          <Col span={6}>
            <Typography.Text strong> Quantity</Typography.Text>
          </Col>
          <Col span={6}>
            <Typography.Text strong>Price</Typography.Text>
          </Col>
        </Row>
        <Divider className="m-2 ms-0" />
        <List
          itemLayout="horizontal"
          dataSource={orderDetails?.products}
          renderItem={(item: any, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <Row>
                    <Col span={12}>
                      <Typography.Text> {item.productName}</Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Typography.Text> {item.quantity}</Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Typography.Text>
                        {CURRENCY_SYMBOL} {item.boughtPrice}
                      </Typography.Text>
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
        />
      </Spin>
    </Modal>
  );
};

export default OrderDetail;
