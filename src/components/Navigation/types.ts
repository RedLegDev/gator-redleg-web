
export interface NavItem {
  title: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: NavItem[];
}
