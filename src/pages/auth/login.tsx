import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import Waves from "@/components/ui/waves";
import { usePermissionContext } from "@/context/permissionContext";
import {
  ILoginForm,
  LoginDefaultValues,
  loginValidation,
} from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "/assets/logo.jpg";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setPermission } = usePermissionContext();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ILoginForm>({
    defaultValues: LoginDefaultValues,
    resolver: yupResolver(loginValidation) as unknown as Resolver<ILoginForm>,
  });

  const submitHandler = () => {
    setIsLoading(true);
    const newPermissions = [
      "ViewUser",
      "ViewProduct",
      "SetProduct",
      "DeleteProduct",
    ];

    setTimeout(() => {
      setPermission(newPermissions);
      localStorage.setItem("permissions", JSON.stringify(newPermissions));
      toast.success("Login Successful!");
      localStorage.setItem("token", "data.token");
      navigate("/");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
      <Waves />
      <div className="bg-white p-8 rounded-lg shadow-lg w-[550px] z-10">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Dentist Logo"
            className="h-20 w-auto rounded-full"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please login to access your patient portal.
        </p>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <RHFTextField
              label="UserName"
              control={control}
              name="userName"
              placeholder="Enter your name"
            />
            <RHFTextField
              label="Password"
              type="password"
              control={control}
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <Button
            isLoading={isLoading}
            variant="default"
            className="w-full h-10"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
