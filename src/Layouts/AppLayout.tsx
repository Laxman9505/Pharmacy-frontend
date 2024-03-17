/** @format */

import { Layout, Menu, theme } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { sideBarItems } from "../constants/constants";

const { Content, Footer, Sider } = Layout;

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (pathname) {
      setActiveKey(sideBarItems.find((item) => item.link == pathname).key);
    }
  }, [pathname]);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="d-flex justify-content-center mt-2 mb-2">
          {/* <img
            src="assets/images/logo.png"
            alt="logo-image"
            className="w-100 m-2"
          /> */}
          <span className="fs-3" style={{ color: "white" }}>
            PHARMA POS
          </span>
        </div>

        <Menu
          onChange={(e) => {
            console.log("--e", e);
          }}
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
        >
          {sideBarItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <span>
                <Link to={item.link}>{item.label}</Link>
              </span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PHARMA POS ©{new Date().getFullYear()} Created with ❤️
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
