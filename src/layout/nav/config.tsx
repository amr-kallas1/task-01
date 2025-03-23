import {
  EXAMS_PATH,
  PRODUCT_PATH,
  SETTINGS_PATH,
  USERS_PATH,
} from "@/routes/path";
import {
  BookText,
  House,
  School,
  Settings,
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
  home: Icon(<House size={25} />),
  users: Icon(<Users size={25} />),
  products: Icon(<UtensilsCrossed size={25} />),
  student: Icon(<School size={25} />),
  settings: Icon(<Settings size={25} />),
  exams: Icon(<BookText size={25} />),
};

export const firstNavConfig = [
  {
    title: "الرئيسية",
    icon: ICONS.home,
    pathName: "/",
  },
  {
    title: "الموظفين",
    icon: ICONS.users,
    pathName: USERS_PATH.USERS,
  },
  {
    title: "الطلاب",
    icon: ICONS.student,
    pathName: PRODUCT_PATH.PRODUCTS,
  },
  {
    title: "الامتحانات",
    icon: ICONS.exams,
    pathName: EXAMS_PATH.EXAMS,
  },
  {
    title: "إعدادات عامة",
    icon: ICONS.settings,
    pathName: SETTINGS_PATH.SETTINGS,
  },
];
