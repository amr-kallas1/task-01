import { usePermissionContext } from "@/context/permissionContext";
import { findFirstRouteMatch } from "@/utils/string-function";
import { Navigate, Outlet } from "react-router-dom";

const NotAuth = () => {
  const { permissions } = usePermissionContext();
  const { route } = findFirstRouteMatch(permissions);
  const token = localStorage.getItem("token");
  if (!token) return <Outlet />;
  return <Navigate to={route} />;
};
export default NotAuth;
