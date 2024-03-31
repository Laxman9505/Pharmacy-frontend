/** @format */

import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Flex,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Spin,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { IoBagCheckOutline, IoCashOutline } from "react-icons/io5";
import { MdOutlineQrCode2, MdPhoneIphone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../Layouts/AppLayout";
import { showConfirmClearCart } from "../../components/Confirmation/ClearCart.js";
import { CURRENCY_SYMBOL, PAYMENT_METHODS } from "../../constants/constants";
import useCartActions from "../../hooks/cartActions";
import { getCurrentFullDate, toStringAsFixed } from "../../utils/helpers";
import CartItem from "./CartItem";
import OrderReciept from "./OrderReciept";
import PayOrder from "./PayOrder";
import ProductTable from "./ProductTable";

const NewOrder = () => {
  const dispatch = useDispatch();
  const { calculateItemsSubtotal, clearCart } = useCartActions();
  const { isPlaceOrderSuccess, placeOrderResponse } = useSelector(
    (state: any) => state.ordersReducer
  );
  const [isPayOrderOpen, setIsPayOrderOpen] = useState(false);
  const [isOrderReceiptOpen, setIsOrderReceiptOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    PAYMENT_METHODS.CASH
  );
  const { getNewOrderCreationDataLoading, newOrderCreationData } = useSelector(
    (state: any) => state.ordersReducer
  );
  const subtotalAmount: number = calculateItemsSubtotal();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState<number>(0);

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { cartProducts } = useSelector((state: any) => state.cartReducer);

  useEffect(() => {
    const handler = setTimeout(
      () => {
        dispatch({
          type: "GET_NEW_ORDER_CREATION_DATA_REQUEST",
          payload: {
            searchKeyword: searchKeyword,
          },
        });
      },
      searchKeyword ? 1000 : 0
    );

    return () => {
      clearTimeout(handler);
    };
  }, [searchKeyword, dispatch]);

  useEffect(() => {
    if (placeOrderResponse?.isPaymentCompleted) {
      dispatch({
        type: "GET_NEW_ORDER_CREATION_DATA_REQUEST",
        payload: {
          searchKeyword: searchKeyword,
        },
      });
    }
  }, [placeOrderResponse]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] =
    newOrderCreationData?.productsWithCategories?.map((proCat, index) => {
      return {
        key: proCat?.categoryId ?? index,
        label: proCat?.categoryName,
        children: <ProductTable products={proCat.products} key={index} />,
      };
    });

  useEffect(() => {
    const discountAmount = (discountPercentage / 100) * subtotalAmount;
    setDiscountAmount(discountAmount);
  }, [discountPercentage, subtotalAmount]);

  useEffect(() => {
    setTotalPayableAmount(subtotalAmount - discountAmount);
  }, [discountAmount, subtotalAmount]);

  useEffect(() => {
    if (isPlaceOrderSuccess) {
      setDiscountPercentage(0);
      setDiscountAmount(0);
    }
  }, [isPlaceOrderSuccess]);

  useEffect(() => {
    if (placeOrderResponse?.isPaymentCompleted) {
      setIsOrderReceiptOpen(true);
    }
  }, [placeOrderResponse]);

  console.log("--cart products", cartProducts);
  return (
    <AppLayout>
      <PayOrder
        isPayOrderOpen={isPayOrderOpen}
        setIsPayOrderOpen={setIsPayOrderOpen}
        setIsOrderReceiptOpen={setIsOrderReceiptOpen}
        totalPaymentAmount={totalPayableAmount}
        discountAmount={discountAmount}
        discountPercentage={discountPercentage}
        selectedPaymentMethod={selectedPaymentMethod}
        orderNo={newOrderCreationData?.orderNo}
      />

      <OrderReciept
        isOrderReceiptOpen={isOrderReceiptOpen}
        setIsOrderReceiptOpen={setIsOrderReceiptOpen}
      />

      <Row className="new-orde r-container" gutter={10}>
        <Col span={15}>
          <Row justify={"space-between"}>
            <Typography.Title level={4}>
              Order No: {newOrderCreationData?.orderNo}
            </Typography.Title>
            <Typography.Text type="secondary">
              {getCurrentFullDate()}
            </Typography.Text>
          </Row>
          <Row className="mt-2">
            <Col span={12}>
              <Input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                size="large"
                placeholder="Search for products..."
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>

          <Spin spinning={getNewOrderCreationDataLoading}>
            <Row className="mt-3">
              <Tabs
                className="w-100"
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
              />
            </Row>
          </Spin>
        </Col>
        <Col span={9}>
          <Card>
            <Row justify={"space-between"} className="mb-2">
              <Typography.Title level={4}>Cart</Typography.Title>
              {cartProducts?.length > 0 && (
                <Tooltip title="Clear Cart">
                  <Button
                    onClick={() => {
                      showConfirmClearCart(function () {
                        clearCart();
                      });
                    }}
                    size="small"
                    shape="circle"
                    icon={<CloseOutlined />}
                    danger
                  ></Button>
                </Tooltip>
              )}
            </Row>
            <Flex
              gap={10}
              vertical
              style={{ height: "45vh", overflowY: "auto" }}
            >
              {cartProducts?.length > 0 ? (
                cartProducts?.map((cartProduct, index) => {
                  return (
                    <CartItem product={cartProduct} index={index} key={index} />
                  );
                })
              ) : (
                <Empty description="Cart is empty. Cart products will appear here !" />
              )}
            </Flex>
            <Row className="mt-3">
              <Card title="Payment Summary" className="w-100">
                <Row justify={"space-between"}>
                  <Typography.Text type="secondary">Subtotal:</Typography.Text>
                  <Typography.Text strong>
                    {CURRENCY_SYMBOL} {toStringAsFixed(subtotalAmount)}
                  </Typography.Text>
                </Row>
                <Row justify={"space-between"} align={"middle"}>
                  <Typography.Text type="secondary">Discount:</Typography.Text>
                  <Space>
                    <InputNumber
                      suffix="%"
                      max={100}
                      min={0}
                      value={discountPercentage}
                      onChange={(e) => setDiscountPercentage(e)}
                    />
                    <Typography.Text strong>
                      {CURRENCY_SYMBOL} {toStringAsFixed(discountAmount)}
                    </Typography.Text>
                  </Space>
                </Row>
                <Divider className="m-2" />
                <Row justify={"space-between"}>
                  <Typography.Text strong>Total Payable:</Typography.Text>
                  <Typography.Text strong>
                    {" "}
                    {CURRENCY_SYMBOL} {toStringAsFixed(totalPayableAmount)}
                  </Typography.Text>
                </Row>
              </Card>
              <Card className="w-100 mt-2" title="Payment Method">
                <Space>
                  <Radio.Group
                    defaultValue={PAYMENT_METHODS.CASH}
                    size="middle"
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  >
                    <Radio.Button value={PAYMENT_METHODS.CASH}>
                      <Space>
                        <IoCashOutline /> Cash
                      </Space>{" "}
                    </Radio.Button>
                    <Radio.Button value={PAYMENT_METHODS.ESEWA}>
                      <Space>
                        <MdOutlineQrCode2 />
                        E-sewa
                      </Space>
                    </Radio.Button>
                    <Radio.Button value={PAYMENT_METHODS.PHONEPAY}>
                      <Space>
                        <MdPhoneIphone />
                        FonePay
                      </Space>
                    </Radio.Button>
                  </Radio.Group>
                </Space>
              </Card>
              <Button
                icon={<IoBagCheckOutline />}
                type="primary"
                size="large"
                disabled={!(cartProducts?.length > 0)}
                className="w-100 mt-4"
                onClick={() => setIsPayOrderOpen(true)}
              >
                Proceed to Checkout
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default NewOrder;
