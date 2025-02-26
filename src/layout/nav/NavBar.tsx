import TooltipButton from "@/components/global/tooltipButton";
import { useOpenSidebarContext } from "@/context/sidebarContext";
import { AUTH_PATH } from "@/routes/path";
import { LogOut } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurrentScreenContext } from "@/context/currentScreenContext";
const Navbar = () => {
  const { currentScreen } = useCurrentScreenContext();
  const { openSidebar, setOpenSidebar } = useOpenSidebarContext();
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center w-screen justify-between p-1 h-16 text-black flex-1 bg-white absolute  transition-all duration-300 ${
        currentScreen == "lg" || currentScreen == "xl" || currentScreen == "2xl"
          ? openSidebar
            ? "left-[280px] max-w-[calc(100%-280px)] "
            : "left-[80px] max-w-[calc(100%-80px)] "
          : "left-0 w-full"
      }`}
    >
      <AlignJustify
        className="ms-3 cursor-pointer"
        size={35}
        onClick={() => setOpenSidebar((prev) => !prev)}
      />

      <div className="flex gap-5">
        <TooltipButton
          title="Logout"
          onClick={() => {
            localStorage.clear();
            navigate(AUTH_PATH.LOGIN);
          }}
          icon={<LogOut className="text-black me-5" />}
        />
      </div>
    </div>
  );
};

export default Navbar;
