import React, { createContext, useContext, useState } from "react";

type OpenModelQuestionContextType = {
  OpenOpenModelQuestion: boolean;
  setOpenOpenModelQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const OpenModelQuestionContext = createContext<OpenModelQuestionContextType>(
  {} as OpenModelQuestionContextType
);

export const OpenModelQuestionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [OpenOpenModelQuestion, setOpenOpenModelQuestion] = useState(false);

  return (
    <OpenModelQuestionContext.Provider
      value={{ OpenOpenModelQuestion, setOpenOpenModelQuestion }}
    >
      {children}
    </OpenModelQuestionContext.Provider>
  );
};

export const useOpenModelQuestionContext = () =>
  useContext(OpenModelQuestionContext);
