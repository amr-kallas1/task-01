import TooltipButton from "@/components/global/tooltipButton";
import { useCurrentScreenContext } from "@/context/currentScreenContext";
import { useOpenSidebarContext } from "@/context/sidebarContext";
import { AUTH_PATH } from "@/routes/path";
import { AlignJustify, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { currentScreen } = useCurrentScreenContext();
  const { openSidebar, setOpenSidebar } = useOpenSidebarContext();
  const navigate = useNavigate();

  return (
    <div
      className={`flex z-[9999] bg-white items-center w-screen justify-between p-1 h-16 text-black flex-1  absolute  transition-all duration-300 ${
        currentScreen == "lg" || currentScreen == "xl" || currentScreen == "2xl"
          ? openSidebar
            ? "right-[280px] max-w-[calc(100%-280px)] "
            : "right-[68px] max-w-[calc(100%-68px)] "
          : "right-0 w-full"
      }`}
    >
      <AlignJustify
        className="ms-3 cursor-pointer dark:text-white text-black"
        size={35}
        onClick={() => setOpenSidebar((prev) => !prev)}
      />

      <div className="flex gap-5">
        <TooltipButton
          title="تسجيل الخروج"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("permissions");
            navigate(AUTH_PATH.LOGIN);
          }}
          icon={<LogOut className="dark:text-white text-black me-5" />}
        />
      </div>
    </div>
  );
};

export default Navbar;
