import React from "react";
import { useLocation } from "react-router-dom";
import { firstNavConfig } from "./config";
import NavItem from "./NavItem";
import logo from "/assets/logo.jpg";
import Typography from "@/components/ui/typography";
import { usePermissionContext } from "@/context/permissionContext";
import { useOpenSidebarContext } from "@/context/sidebarContext";
const NavList: React.FunctionComponent<{
  navListData: typeof firstNavConfig;
  showTitle: boolean;
}> = ({ navListData, showTitle }) => {
  const { pathname } = useLocation();
  const { openSidebar, setOpenSidebar } = useOpenSidebarContext();
  const { permissions } = usePermissionContext();

  const toggleDrawer = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <ul className="flex flex-col gap-1">
      <li>
        <div
          className={`flex items-center mb-3 ${
            !openSidebar && "justify-center"
          } text-main`}
        >
          <img
            src={logo}
            alt=""
            onClick={toggleDrawer}
            className="w-10 h-10 rounded-full"
          />
          <Typography
            variant="h6"
            size="medium"
            className={`ml-2 dark:text-white ${
              openSidebar
                ? "opacity-100 "
                : "opacity-0 fixed top-[-1000px]"
            } transition-all duration-300 `}
          >
            Admin Dashboard
          </Typography>
        </div>
      </li>
      {navListData.map(({ title, pathName, icon, show }) => (
        <li
          key={title}
          className={`list-none ${
            (Array.isArray(permissions) && permissions.includes(show ?? "")) ||
            show == ""
              ? "block"
              : "hidden"
          }`}
        >
          <NavItem
            title={title}
            icon={icon}
            isMatch={pathname.includes(pathName)}
            showTitle={showTitle}
            pathname={pathName}
          />
        </li>
      ))}
    </ul>
  );
};

export default NavList;
