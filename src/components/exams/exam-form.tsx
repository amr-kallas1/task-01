import queries, { keys } from "@/api/product/queries";
import { IUpdateProduct } from "@/api/product/type";
import PageTitle from "@/components/global/page-title";
import RHFReactSelect from "@/components/hook-form/RHFMultiSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useOpenSidebarContext } from "@/context/sidebarContext";
import { PRODUCT_PATH } from "@/routes/path";
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

const ExamForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { openSidebar } = useOpenSidebarContext();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: productDetails, isLoading } = queries.GetProduct(id);
  const { mutate, isPending } = queries.ProductAction(id);

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
    localStorage.setItem("numberOfQuestions", data.numberOfQuestions);
    localStorage.setItem("numberOfAnswers", data.numberOfAnswers.value);

    onSubmit();

    // mutate(body, {
    //   onSuccess: () => {
    //     toast.success(
    //       id
    //         ? "the product has been edited successfully"
    //         : "the product has been added successfully"
    //     );
    //     queryClient.invalidateQueries({ queryKey: keys.getAllProduct._def });
    //     queryClient.invalidateQueries({ queryKey: keys.getProduct._def });
    //     navigate(PRODUCT_PATH.PRODUCTS);
    //      // Call the onSubmit prop to trigger the swap
    //   },
    // });
  };

  return (
    <div>
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
            name="slug"
            control={control}
            label="الاسم"
            placeholder="أدخل اسم الامتحان"
          />

          <RHFReactSelect
            control={control}
            name="categored"
            skeleton={isLoading}
            isLoading={false}
            label="المدة وعدد الاحتمالات"
            placeholder="اختر عدد الإجابات"
            options={[
              {
                label: "2",
                value: "2",
              },
              {
                label: "3",
                value: "3",
              },
              {
                label: "4",
                value: "4",
              },
            ]}
          />
          <RHFTextField
            isLoading={isLoading}
            name="numberOfQuestions"
            control={control}
            label="عدد الأسئلة"
            type="number"
            placeholder="أدخل عدد الأسئلة"
          />
          <RHFReactSelect
            control={control}
            name="numberOfAnswers"
            skeleton={isLoading}
            isLoading={false}
            label="عدد الإجابات"
            placeholder="اختر عدد الإجابات"
            options={[
              {
                label: "2",
                value: "2",
              },
              {
                label: "3",
                value: "3",
              },
              {
                label: "4",
                value: "4",
              },
            ]}
          />

          <div className="flex gap-4 w-[90%] flex-col-reverse justify-center items-center mx-auto mt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(PRODUCT_PATH.PRODUCTS)}
            >
              رجوع
            </Button>
            <Button isLoading={isPending} className="w-full">
              {id ? "تعديل الامتحان" : "إضافة امتحان"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExamForm;
