import PageTitle from "@/components/global/page-title";
import RHFTextField from "@/components/hook-form/RHFTextField";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useOpenSidebarContext } from "@/context/sidebarContext";
import { SETTINGS_PATH } from "@/routes/path";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const SettingAction = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { openSidebar } = useOpenSidebarContext();
  const { handleSubmit, control } = useForm({});

  const submitHandler = () => {};
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
            isLoading={false}
            name="slug"
            control={control}
            label="الاسم"
            placeholder="أدخل اسم الإعدادات"
          />
          <RHFTextField
            isLoading={false}
            name="price"
            control={control}
            label="عدد الاحتمالات"
            type="number"
            placeholder="أدخل عدد الاحتمالات"
          />
          <input
            type="datetime-local"
            id="time"
            className="time-input p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
            <Button isLoading={false} className="w-full">
              {id ? "تعديل البيانات" : "إضافة البيانات"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingAction;
