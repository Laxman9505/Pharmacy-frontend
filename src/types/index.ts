/** @format */

import { ReactElement } from "react";

export interface SidebarItem {
  key: string;
  label: string;
  icon: ReactElement;
  link: string;
}
