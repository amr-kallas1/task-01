import queries, { keys } from "@/api/settings/queries";
import DeleteDialog from "@/components/global/delete-dialog";
import PageTitle from "@/components/global/page-title";
import TooltipButton from "@/components/global/tooltipButton";
import Pencil from "@/components/icons/pencil";
import Trash from "@/components/icons/trash";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { useOpenDeleteDialogContext } from "@/context/openDeleteDialog";
import { SETTINGS_PATH } from "@/routes/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { data, isLoading, isError } = queries.GetAllQuizzes();
  const { mutate, isPending } = queries.DeleteQuizze();

  const navigate = useNavigate();
  const { setOpenDeleteDialog } = useOpenDeleteDialogContext();
  const [id, setId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setId(id);
    setOpenDeleteDialog(true);
  };
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
      <div
        className={`grid ${
          data && data?.data.results?.length > 1
            ? "grid-cols-[repeat(auto-fit,minmax(360px,1fr))]"
            : "grid-cols-2"
        } gap-4`}
      >
        {(!isLoading && data?.data.results?.length === 0) || isError ? (
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
            {data?.data?.results?.map(
              ({ name, duration, numberOfAttempts, id }) => (
                <div
                  key={id}
                  className="bg-white flex-1  text-center h-fit shadow-lg rounded-lg flex flex-col justify-start"
                >
                  <Typography
                    variant="h6"
                    className="py-4 border-b-2 bg-primary text-white rounded-lg shadow-sm"
                  >
                    {name}
                  </Typography>
                  <div className="flex flex-col flex-wrap justify-start p-5  w-full gap-3">
                    <div className="flex gap-4">
                      <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                        عدد المحاولات :
                      </Typography>
                      <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                        {numberOfAttempts}
                      </Typography>
                    </div>
                    <div className="flex gap-4">
                      <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                        المدة الزمنية :
                      </Typography>
                      <Typography className="bg-[#f1f1f1] p-2 rounded-md w-fit">
                        {duration} دقيقة
                      </Typography>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-center gap-8 mt-4 pb-4">
                    <TooltipButton
                      onClick={() =>
                        navigate(SETTINGS_PATH.EDIT_SETTING + "/" + id)
                      }
                      icon={<Pencil />}
                      title="تعديل"
                      className="border-none items-start p-2 rounded-full hover:bg-accent"
                    />
                    <TooltipButton
                      onClick={() => handleDelete(id)}
                      icon={<Trash />}
                      title="حذف"
                      className="border-none items-start p-2 rounded-full hover:bg-accent"
                    />
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
      <DeleteDialog
        mutateFn={mutate}
        id={id}
        setId={setId}
        isPending={isPending}
        dialogKey="deleteProduct"
        titleToast="تم حذف البيانات بنجاح"
        invalidateQueryKey={keys.getAllQuizzes._def}
      />
    </div>
  );
};

export default Settings;
