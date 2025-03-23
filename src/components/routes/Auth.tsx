import { AUTH_PATH } from "@/routes/path";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const token = localStorage.getItem("token");
  if (token) return <Outlet />;
  return <Navigate to={AUTH_PATH.LOGIN} />;
};
export default Auth;
