import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { firstNavConfig } from "./config";
const NavList: React.FunctionComponent<{
  navListData: typeof firstNavConfig;
  showTitle: boolean;
}> = ({ navListData, showTitle }) => {
  const { pathname } = useLocation();

  return (
    <ul className="flex flex-col gap-1">
      {navListData.map(({ title, pathName, icon }) => (
        <li key={title} className={`list-none`}>
          <NavItem
            title={title}
            icon={icon}
            isMatch={pathname == pathName}
            showTitle={showTitle}
            pathname={pathName}
          />
        </li>
      ))}
    </ul>
  );
};

export default NavList;
