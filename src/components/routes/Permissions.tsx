import { usePermissionContext } from "@/context/permissionContext";
import { NOT_FOUND_PATH } from "@/routes/path";
import { Navigate } from "react-router-dom";

type PermisssionsType = {
  role: string;
  Component: React.ReactElement;
};

const Permissions = ({ role, Component }: PermisssionsType) => {
  const { permissions } = usePermissionContext();
  if (Array.isArray(permissions) && permissions.includes(role))
    return Component;

  return <Navigate to={NOT_FOUND_PATH.NOT_FOUND} />;
};
export default Permissions;
