import queries from "@/api/settings/queries";
import PageTitle from "@/components/global/page-title";
import TooltipButton from "@/components/global/tooltipButton";
import Pencil from "@/components/icons/pencil";
import Trash from "@/components/icons/trash";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { SETTINGS_PATH } from "@/routes/path";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { data, isLoading, isError } = queries.GetAllQuizzes();
  const navigate = useNavigate();

  const handleDelete = (id: number) => {};
  return (
    <div>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[{ label: "الإعدادات العامة", link: SETTINGS_PATH.SETTINGS }]}
        />
        <div className="flex justify-between items-start">
          <PageTitle
            title="الإعدادات العامة"
            subTitle="تحكم وإدارة بالإعدادات"
          />
          <Button
            buttonContainerClass="gap-1"
            variant="add"
            onClick={() => navigate(SETTINGS_PATH.ADD_SETTING)}
          >
            إضافة إعدادات
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4">
        {(!isLoading && data?.length === 0) || isError ? (
          <div className="flex items-center justify-center h-full flex-col w-[95%] m-auto p-[30px] rounded-xl">
            <img src="/assets/no-data.svg" alt="" />
            <Typography variant="subtitle2">لا يوجد بيانات</Typography>
          </div>
        ) : isLoading ? (
          new Array(4).fill(1).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-[200px] w-[250px] rounded-xl" />
            </div>
          ))
        ) : (
          <>
            <div className="bg-white flex-1  text-center h-fit shadow-lg rounded-lg flex flex-col justify-start">
              <Typography
                variant="h6"
                className="py-4 border-b-2 bg-primary text-white rounded-lg shadow-sm"
              >
                خيار 1
              </Typography>
              <div className="flex flex-col flex-wrap justify-start p-5  w-full gap-3">
                <div className="flex gap-4">
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    عدد المحاولات :
                  </Typography>
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    3
                  </Typography>
                </div>
                <div className="flex gap-4">
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    المدة الزمنية :
                  </Typography>
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    3:47 دقيقة
                  </Typography>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-center gap-8 mt-4 pb-4">
                <TooltipButton
                  onClick={() => navigate(SETTINGS_PATH.EDIT_SETTING + "/")}
                  icon={<Pencil />}
                  title="تعديل"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
                <TooltipButton
                  onClick={() => handleDelete(3)}
                  icon={<Trash />}
                  title="حذف"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
              </div>
            </div>
            <div className="bg-white flex-1  text-center h-fit shadow-lg rounded-lg flex flex-col justify-start">
              <Typography
                variant="h6"
                className="py-4 border-b-2 bg-primary text-white rounded-lg shadow-sm"
              >
                خيار 1
              </Typography>
              <div className="flex flex-col flex-wrap justify-start p-5  w-full gap-3">
                <div className="flex gap-4">
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    عدد المحاولات :
                  </Typography>
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    3
                  </Typography>
                </div>
                <div className="flex gap-4">
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    المدة الزمنية :
                  </Typography>
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    3:47 دقيقة
                  </Typography>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-center mt-4 gap-8 pb-4">
                <TooltipButton
                  onClick={() => navigate(SETTINGS_PATH.EDIT_SETTING + "/")}
                  icon={<Pencil />}
                  title="تعديل"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
                <TooltipButton
                  onClick={() => handleDelete(3)}
                  icon={<Trash />}
                  title="حذف"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
              </div>
            </div>
            <div className="bg-white flex-1  text-center h-fit shadow-lg rounded-lg flex flex-col justify-start">
              <Typography
                variant="h6"
                className="py-4 border-b-2 bg-primary text-white rounded-lg shadow-sm"
              >
                خيار 1
              </Typography>
              <div className="flex flex-col flex-wrap justify-start p-5  w-full gap-3">
                <div className="flex gap-4">
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    عدد المحاولات :
                  </Typography>
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    3
                  </Typography>
                </div>
                <div className="flex gap-4">
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    المدة الزمنية :
                  </Typography>
                  <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                    3:47 دقيقة
                  </Typography>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-center mt-4 gap-8 pb-4">
                <TooltipButton
                  onClick={() => navigate(SETTINGS_PATH.EDIT_SETTING + "/")}
                  icon={<Pencil />}
                  title="تعديل"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
                <TooltipButton
                  onClick={() => handleDelete(3)}
                  icon={<Trash />}
                  title="حذف"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
