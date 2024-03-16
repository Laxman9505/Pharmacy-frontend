/** @format */

import { Col, Row, Statistic } from "antd";
import React from "react";
import CountUp from "react-countup";
import AppLayout from "../Layouts/AppLayout";

const formatter = (value: number) => <CountUp end={value} separator="," />;

const App: React.FC = () => {
  return (
    <AppLayout>
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <Statistic title="Total Sales" value={112893} formatter={formatter} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Total Customers"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Average Transaction Value"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Total Profit"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Total Orders"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Total Medicines Sold"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Total Discounts Given"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Total Pending Orders"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default App;
