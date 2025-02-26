import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useCurrentScreenContext } from "@/context/currentScreenContext";
import { useOpenSidebarContext } from "@/context/sidebarContext";
import { cn } from "@/lib/utils";
import { getCurrentBreakpoint } from "@/utils/theme-functions";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import NavList from "./nav/NavList";
import { firstNavConfig } from "./nav/config";
const SideBar: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useCurrentScreenContext();
  const { openSidebar, setOpenSidebar } = useOpenSidebarContext();
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentBreakpoint = getCurrentBreakpoint();
      setCurrentScreen(currentBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (openSidebar) {
      setTimeout(() => setShowTitle(true), 300);
    } else {
      setShowTitle(false);
    }
  }, [openSidebar]);

  const sidebarContent = (
    <div className=" flex flex-1 flex-col justify-between gap-6 pt-8 ">
      <div className="flex flex-1 flex-col justify-start  gap-1 mb-2 ">
        <NavList navListData={firstNavConfig} showTitle={showTitle} />
      </div>
    </div>
  );

  return currentScreen == "lg" ||
    currentScreen == "xl" ||
    currentScreen == "2xl" ? (
    <div
      className={cn(
        "flex flex-col border border-r-gray-200 sticky top-0 z-50 h-screen overflow-y-auto transition-all duration-300 ",
        openSidebar
          ? "min-w-[280px] max-w-[280px]"
          : "min-w-[80px] max-w-[80px]"
      )}
    >
      <div className="-mt-4 overflow-y-auto overflow-x-hidden flex flex-1 px-2">
        {sidebarContent}
      </div>
    </div>
  ) : (
    <Drawer
      shouldScaleBackground={true}
      open={openSidebar}
      direction="left"
      onOpenChange={() => setOpenSidebar(false)}
    >
      <DrawerContent
        aria-describedby=""
        draggable={true}
        className={cn(
          "flex flex-1 flex-col border border-r-gray-200 h-screen overflow-y-auto fixed top-0 z-50 ",
          "w-[280px]"
        )}
      >
        <DialogTitle></DialogTitle>
        <div className=" overflow-y-auto px-2 overflow-x-hidden flex flex-1">
          {sidebarContent}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
