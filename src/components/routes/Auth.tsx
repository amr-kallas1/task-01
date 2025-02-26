import { usePermissionContext } from "@/context/permissionContext";
import { AUTH_PATH } from "@/routes/path";
import { findFirstRouteMatch } from "@/utils/string-function";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const { permissions } = usePermissionContext();
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const { route } = findFirstRouteMatch(permissions);
  if (!route) {
    localStorage.clear();
    <Navigate to={AUTH_PATH.LOGIN} />;
  }
  if (pathname == "/" && route) return <Navigate to={route} />;
  if (token) return <Outlet />;
  return <Navigate to={AUTH_PATH.LOGIN} />;
};
export default Auth;
