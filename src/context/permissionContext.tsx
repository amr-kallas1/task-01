import React, { createContext, useContext, useEffect, useState } from "react";

type PermissionContextType = {
  permissions: string[];
  setPermission: React.Dispatch<React.SetStateAction<string[]>>;
};

const PermissionContext = createContext<PermissionContextType>(
  {} as PermissionContextType
);

export const PermissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [permissions, setPermission] = useState<string[]>(() => {
    const storedPermissions = localStorage.getItem("permissions");
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  });

  useEffect(() => {
    localStorage.setItem("permissions", JSON.stringify(permissions));
  }, [permissions]);
  return (
    <PermissionContext.Provider value={{ permissions, setPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissionContext = () => useContext(PermissionContext);
