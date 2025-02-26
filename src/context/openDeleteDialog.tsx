import React, { createContext, useContext, useState } from "react";

type OpenDeleteDialogContextType = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const OpenDeleteDialogContext = createContext<OpenDeleteDialogContextType>(
  {} as OpenDeleteDialogContextType
);

export const OpenDeleteDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <OpenDeleteDialogContext.Provider
      value={{ openDeleteDialog, setOpenDeleteDialog }}
    >
      {children}
    </OpenDeleteDialogContext.Provider>
  );
};

export const useOpenDeleteDialogContext = () =>
  useContext(OpenDeleteDialogContext);
