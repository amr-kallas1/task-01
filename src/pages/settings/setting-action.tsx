import queries, { keys } from "@/api/settings/queries";
import { IGetQuizze } from "@/api/settings/type";
import PageTitle from "@/components/global/page-title";
import RHFTextField from "@/components/hook-form/RHFTextField";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useOpenSidebarContext } from "@/context/sidebarContext";
import { SETTINGS_PATH } from "@/routes/path";
import {
  IQuizzeForm,
  settingDefaultValues,
  settingValidation,
  settingValues,
} from "@/validation/setting";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const SettingAction = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openSidebar } = useOpenSidebarContext();

  const { mutate, isPending } = queries.QuizzeAction(id);
  const { data: quizzeDetails, isLoading } = queries.GetQuizze(id);

  const { handleSubmit, control } = useForm({
    defaultValues: settingDefaultValues,
    resolver: yupResolver(settingValidation),
    values: settingValues(quizzeDetails as IGetQuizze),
  });

  const submitHandler = (data: IQuizzeForm) => {
    const body = {
      id: id ? id : undefined,
      ...data,
    };
    mutate(body, {
      onSuccess: () => {
        toast.success(
          id ? "تمت تعديل البيانات بنجاح" : "تمت إضافة البيانات بنجاح"
        );
        queryClient.invalidateQueries({ queryKey: keys.getAllQuizzes._def });
        navigate(SETTINGS_PATH.SETTINGS);
      },
    });
  };
  return (
    <div>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[
            { label: "الإعدادات", link: SETTINGS_PATH.SETTINGS },
            {
              label: `${id ? "تعديل الإعدادات" : "إضافة أعدادات"}`,
              link: "",
            },
          ]}
        />
        <div className="flex justify-between items-start">
          <PageTitle
            title={`${id ? "تعديل الإعدادات" : "إضافة إعدادات"}`}
            subTitle={`${id ? "عدل معلومات العامة" : "إضافة معلومات العامة"}`}
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
            placeholder="أدخل اسم الإعدادات"
          />
          <RHFTextField
            isLoading={isLoading}
            name="numberOfAttempts"
            control={control}
            label="عدد الاحتمالات"
            type="number"
            placeholder="أدخل عدد الاحتمالات"
          />
          <RHFTextField
            isLoading={isLoading}
            name="duration"
            control={control}
            label="المدة الزمنية"
            type="number"
            secondaryLabel="(بالدقيقة)"
            placeholder="أدخل المدة الزمنية"
          />

          <div className="flex gap-4 w-[90%] flex-col-reverse justify-center items-center mx-auto mt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(SETTINGS_PATH.SETTINGS)}
            >
              رجوع
            </Button>
            <Button isLoading={isPending} className="w-full">
              {id ? "تعديل البيانات" : "إضافة البيانات"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingAction;
