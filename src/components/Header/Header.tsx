/** @format */

import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Header: AntHeader } = Layout;

const Header = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const { userDetails } = useSelector(
    (state: any) => state.authenticationReducer
  );

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        dispatch({
          type: "LOGOUT",
        });
      },
    },
  ];

  return (
    <AntHeader style={{ padding: 0, background: colorBgContainer }}>
      <div className="ms-3 d-flex justify-content-between align-items-center me-3">
        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<MenuUnfoldOutlined />}
            size={"large"}
          />
        </div>
        <div>
          {" "}
          <Avatar style={{ backgroundColor: "#87d068" }}>M</Avatar>
          <Dropdown menu={{ items }}>
            <span className="ms-2 cursor-pointer">
              {/* {userDetails?.name} <DownOutlined /> */}
              Medme Pharmacy
            </span>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
