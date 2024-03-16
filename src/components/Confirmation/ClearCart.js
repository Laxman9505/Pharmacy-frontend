/** @format */

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { PRIMARY_BUTTOM_COLOR } from "../../constants/constants";

const { confirm } = Modal;

export const showConfirmClearCart = (onOk) => {
  confirm({
    title: "Clear Cart",
    icon: <ExclamationCircleFilled />,
    content: "Are you sure want to clear cart ?",
    okButtonProps: {
      style: {
        background: PRIMARY_BUTTOM_COLOR,
      },
    },
    cancelButtonProps: {
      style: {
        border: `1px solid ${PRIMARY_BUTTOM_COLOR}`,
        color: PRIMARY_BUTTOM_COLOR,
      },
    },
    onOk() {
      onOk();
    },
    onCancel() {},
  });
};
