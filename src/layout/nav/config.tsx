import { permissionsOptions } from "@/constants/static-options";
import { PRODUCT_PATH, USERS_PATH } from "@/routes/path";
import {
  BadgePlus,
  Bell,
  Car,
  LayoutGrid,
  Link,
  Megaphone,
  Settings,
  Shield,
  ShoppingCart,
  Store,
  TicketPercent,
  UserRound,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { CSSProperties } from "react";

const Icon = (path: string | JSX.Element, className?: CSSProperties) =>
  typeof path === "string" ? (
    <img src={path} alt="nav Icon" style={className} />
  ) : (
    path
  );

const ICONS = {
  users: Icon(<Users size={25} />),
  customers: Icon(<UserRound size={25} />),
  stores: Icon(<Store size={25} />),
  drivers: Icon(<Car size={25} />),
  products: Icon(<UtensilsCrossed size={25} />),
  categories: Icon(<LayoutGrid size={25} />),
  coupons: Icon(<TicketPercent size={25} />),
  notification: Icon(<Bell size={25} />),
  settings: Icon(<Settings size={25} />),
  roles: Icon(<Shield size={25} />),
  banner: Icon(<Megaphone size={25} />),
  logo: Icon("/assets/logo.svg", { width: "40px", height: "40px" }),
  appVersions: Icon(<Link size={25} />),
  order: Icon(<ShoppingCart size={25} />),
  extraItems: Icon(<BadgePlus size={25} />),
};

export const firstNavConfig = [
  {
    title: "Users",
    icon: ICONS.users,
    show: permissionsOptions.user.view,
    pathName: USERS_PATH.USERS,
  },

  {
    title: "Products",
    icon: ICONS.products,
    show: permissionsOptions.product.view,
    pathName: PRODUCT_PATH.PRODUCTS,
  },
];
