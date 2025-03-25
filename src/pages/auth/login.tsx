import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import Waves from "@/components/ui/waves";
import { LoginDefaultValues, loginValidation } from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import queries from "@/api/auth/queries";
import { ILogin } from "@/api/auth/type";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: LoginDefaultValues,
    resolver: yupResolver(loginValidation) as unknown as Resolver<ILogin>,
  });

  const { mutate ,isPending } = queries.login();

  const submitHandler = (body: ILogin) => {
    console.log(body)
    mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        toast.success("تم تسجيل الدخول بنجاح");
        navigate("/");
        localStorage.setItem("token", data.token);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
      <Waves />
      <div className="bg-white dark:bg-[#2e2a45] p-8 rounded-lg shadow-lg w-[550px] z-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-green-500 mb-2 text-center">
          أهلاً بعودتك!
        </h2>
        <p className="text-sm text-gray-600 dark:text-white text-center mb-6">
          الرجاء تسجيل الدخول للوصول إلى لوحة التحكم.
        </p>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <RHFTextField
              label="الايميل"
              control={control}
              name="email"
              placeholder="أدخل الايميل"
              endAdornment={<UserRound />}
            />
            <RHFTextField
              label="كلمة المرور"
              type="password"
              control={control}
              name="password"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <Button
            isLoading={isPending}
            variant="default"
            className="w-full h-10"
          >
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
