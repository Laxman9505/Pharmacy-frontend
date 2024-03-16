/** @format */

import { ReactElement } from "react";

export interface SidebarItem {
  key: number;
  label: string;
  icon: ReactElement;
  link: string;
}
