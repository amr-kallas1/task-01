import queries, { keys } from "@/api/student/queries";
import { IUpdateProduct } from "@/api/student/type";
import PageTitle from "@/components/global/page-title";
import RHFTextField from "@/components/hook-form/RHFTextField";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useOpenSidebarContext } from "@/context/sidebarContext";
import { STUDENT_PATH } from "@/routes/path";
import {
  IActionProduct,
  productDefaultValuesAction,
  productValidation,
  productValues,
} from "@/validation/product";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const StudentAction = () => {
  const { openSidebar } = useOpenSidebarContext();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: productDetails, isLoading } = queries.GetProduct(id);
  // const { mutate, isPending } = queries.StudentAction(id);

  const { handleSubmit, control, reset } = useForm<IActionProduct>({
    resolver: yupResolver(
      productValidation
    ) as unknown as Resolver<IActionProduct>,
    defaultValues: productDefaultValuesAction,
  });

  useEffect(() => {
    if (productDetails) {
      reset(productValues(productDetails as IUpdateProduct));
    }
  }, [productDetails, reset]);

  const submitHandler = (data: IActionProduct) => {
    const body = {
      ...data,
      id: Number(id),
      category: data.category.value,
    };

    // mutate(body, {
    // //   onSuccess: () => {
    // //     toast.success(
    // //       id
    // //         ? "the product has been edited successfully"
    // //         : "the product has been added successfully"
    // //     );
    // //     queryClient.invalidateQueries({ queryKey: keys.getAllProduct._def });
    // //     queryClient.invalidateQueries({ queryKey: keys.getProduct._def });
    // //     navigate(STUDENT_PATH.STUDENT);
    // //   },
    // // });
  };

  return (
    <div>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[
            { label: "الطلاب", link: STUDENT_PATH.STUDENT },
            {
              label: `${id ? "تعديل الطالب" : "إضافة طالب"}`,
              link: "",
            },
          ]}
        />
        <div className="flex justify-between items-start">
          <PageTitle
            title={`${id ? "تعديل الطالب" : "إضافة طالب"}`}
            subTitle={`${id ? "عدل معلومات الطالب" : "إضافة معلومات الطالب"}`}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" flex-1 flex justify-center"
      >
        <div
          className={`w-full ${
            !openSidebar ? "max-w-[1175px]" : "max-w-[943px]"
          }  py-6 border border-solid  rounded-md gap-4 flex flex-col`}
        >
          <RHFTextField
            isLoading={isLoading}
            name="name"
            control={control}
            label="الاسم"
            placeholder="ادخل الاسم"
          />
          <RHFTextField
            isLoading={isLoading}
            name="email"
            control={control}
            label="الايميل"
            type="number"
            placeholder="ادخل الايميل"
          />
          <RHFTextField
            label="كلمة المرور"
            type="password"
            control={control}
            name="password"
            placeholder="أدخل كلمة المرور"
          />
          <div className="flex gap-4 w-[90%] flex-col-reverse justify-center items-center mx-auto mt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(STUDENT_PATH.STUDENT)}
            >
              رجوع
            </Button>
            <Button isLoading={false} className="w-full">
              {id ? "تعديل الطالب" : "إضافة طالب"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentAction;
