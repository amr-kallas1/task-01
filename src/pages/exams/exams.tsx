import queries from "@/api/users/queries";
import PageTitle from "@/components/global/page-title";
import TooltipButton from "@/components/global/tooltipButton";
import Pencil from "@/components/icons/pencil";
import Trash from "@/components/icons/trash";
import Table from "@/components/table/table";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { EXAMS_PATH, USERS_PATH } from "@/routes/path";
import { useNavigate } from "react-router-dom";

const columns = [
  { title: "#" },
  { title: "اسم الموظف" },
  { title: "الكنية" },
  { title: "رقم الهاتف" },
  { title: "الإجراءات", className: "text-center" },
];

const Exams = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = queries.GetAllUser();
  const handleDelete = (id: number) => {};

  return (
    <>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs data={[{ label: "الامتحانات", link: USERS_PATH.USERS }]} />
        <div className="flex justify-between items-start">
          <PageTitle title="الامتحانات" subTitle="تحكم وإدارة الامتحانات" />
          <Button
            buttonContainerClass="gap-1"
            variant="add"
            onClick={() => navigate(EXAMS_PATH.ADD_EXAM)}
          >
            إضافة امتحان
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        dataLength={data?.length}
        WithPagination
        totalPages={3}
      >
        {data?.map(({ id, name, phone, username }, index) => (
          <TableRow className={"p-6 "} key={id}>
            <TableCell className="font-medium ">{index + 1}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{name} </TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell className={`flex justify-center`}>
              <TooltipButton
                onClick={() => navigate(EXAMS_PATH.EDIT_EXAM + "/" + id)}
                icon={<Pencil />}
                title="تعديل المعلومات"
                className="border-none items-start p-2 rounded-full hover:bg-accent"
              />
              <TooltipButton
                onClick={() => handleDelete(id)}
                icon={<Trash />}
                title="حذف"
                className="border-none items-start p-2 rounded-full hover:bg-accent"
              />
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default Exams;
