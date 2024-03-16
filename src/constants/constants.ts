/** @format */
import {
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { FaStore, FaUserFriends } from "react-icons/fa";
import { SidebarItem } from "../types";

export const sideBarItems: SidebarItem[] = [
  {
    key: 1,
    label: "Dashboard",
    icon: React.createElement(HomeOutlined),
    link: "/",
  },
  {
    key: 2,
    label: "New Order",
    icon: React.createElement(ShoppingCartOutlined),
    link: "/new-order",
  },
  {
    key: 3,
    label: "Manage Orders",
    icon: React.createElement(UnorderedListOutlined),
    link: "/manage-orders",
  },
  {
    key: 4,
    label: "Inventory",
    icon: React.createElement(ShoppingFilled),
    link: "/inventory",
  },
  {
    key: 5,
    label: "Product Categories",
    icon: React.createElement(BiCategory),
    link: "/product-categories",
  },
  {
    key: 6,
    label: "Store Settings",
    icon: React.createElement(FaStore),
    link: "/store-settings",
  },
  {
    key: 7,
    label: "Customers",
    icon: React.createElement(FaUserFriends),
    link: "/manage-customers",
  },
];

export const VALIDATION_MESSAGE_INPUT = "This must not be empty !";
export const DATE_FORMAT = "YYYY/MM/DD";
export const CURRENCY_SYMBOL = "Rs";
export const PRIMARY_BUTTOM_COLOR = "#00b96b";
