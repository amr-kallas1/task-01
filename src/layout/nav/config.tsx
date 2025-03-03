import { permissionsOptions } from "@/constants/static-options";
import { PRODUCT_PATH, USERS_PATH } from "@/routes/path";
import {
  Users,
  UtensilsCrossed
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
  products: Icon(<UtensilsCrossed size={25} />),
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
