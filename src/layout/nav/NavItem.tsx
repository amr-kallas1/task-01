import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import TooltipButton from "@/components/global/tooltipButton";
import { useOpenSidebarContext } from "@/context/sidebarContext";

interface NavItemProps {
  title: string;
  icon: JSX.Element;
  pathname?: string;
  isMatch: boolean;
  className?: string;
  onClick?: () => void;
  showTitle: boolean;
}

const NavItem: React.FunctionComponent<NavItemProps> = ({
  title,
  pathname,
  icon,
  isMatch,
  className,
  onClick,
  showTitle,
}) => {
  const { openSidebar } = useOpenSidebarContext();

  return (
    <div
      className={cn(
        `flex items-center w-full  rounded-sm my-1 ${
          isMatch
            ? "bg-primary dark:bg-green-600"
            : "hover:bg-[#f1f1f1] dark:hover:bg-green-700"
        } `,
        className
      )}
    >
      <Link
        to={pathname || "#"}
        onClick={onClick}
        className={cn(
          `text-gray-700 dark:text-white text-md leading-6 font-medium w-full flex ${
            openSidebar ? "justify-start" : "justify-center"
          } items-center gap-3 px-3 py-2 transition-opacity duration-300 `,
          isMatch && "text-gray-800 dark:text-white"
        )}
      >
        <TooltipButton
          isSidebar={true}
          icon={icon}
          title={title}
          className={isMatch ? "text-white " : "text-black dark:text-white"}
        />

        {showTitle && (
          <span
            className={`${cn(
              "ml-2",
              showTitle ? "opacity-100" : "opacity-0",
              isMatch ? "text-white" : "text-black dark:text-white"
            )} `}
          >
            {title}
          </span>
        )}
      </Link>
    </div>
  );
};

export default NavItem;
