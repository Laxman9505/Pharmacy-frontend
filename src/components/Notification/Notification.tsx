/** @format */

import { notification } from "antd";

export const openNotificationWithIcon = (type: string, message: string) => {
  // @ts-ignore
  notification[type]({
    // message: type.charAt(0).toUpperCase() + type.slice(1),
    message: type == "error" ? "Error" : type == "info" ? "Info" : "Success",
    description: message,
    duration: 3,
  });
};
