import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType
);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <SidebarContext.Provider
      value={{ openSidebar, setOpenSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useOpenSidebarContext = () =>
  useContext(SidebarContext);