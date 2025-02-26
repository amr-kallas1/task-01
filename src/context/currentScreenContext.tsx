import React, { createContext, useContext, useState } from "react";

type CurrentScreenContextType = {
  currentScreen: string;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
};

const CurrentScreenContext = createContext<CurrentScreenContextType>(
  {} as CurrentScreenContextType
);

export const CurrentScreenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentScreen, setCurrentScreen] = useState("lg");

  return (
    <CurrentScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};

export const useCurrentScreenContext = () =>
  useContext(CurrentScreenContext);
