import queries, { keys } from "@/api/product/queries";
import DeleteDialog from "@/components/global/delete-dialog";
import PageTitle from "@/components/global/page-title";
import TooltipButton from "@/components/global/tooltipButton";
import Eye from "@/components/icons/eye";
import Pencil from "@/components/icons/pencil";
import Trash from "@/components/icons/trash";
import Table from "@/components/table/table";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useOpenDeleteDialogContext } from "@/context/openDeleteDialog";
import { PRODUCT_PATH } from "@/routes/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  { title: "#" },
  { title: "اسم الموظف" },
  { title: "الكنية" },
  { title: "رقم الهاتف" },
  { title: "الإجراءات", className: "text-center" },
];

const Products = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number | null>(null);
  const { setOpenDeleteDialog } = useOpenDeleteDialogContext();
  const { data, isLoading, isError } = queries.GetAllProduct();
  const { mutate, isPending } = queries.DeleteProduct();

  const handleDelete = (id: number) => {
    setId(id);
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[{ label: "الطلاب", link: PRODUCT_PATH.PRODUCTS }]}
        />
        <div className="flex justify-between items-start">
          <PageTitle title="الطلاب" subTitle="تحكم وإدارة الطلاب" />
          <Button
            buttonContainerClass="gap-1"
            variant="add"
            onClick={() => navigate(PRODUCT_PATH.ADD_PRODUCT)}
          >
            إضافة طالب
          </Button>
        </div>
      </div>

      <Table
        isError={isError}
        columns={columns}
        isLoading={isLoading}
        WithPagination
        totalPages={3}
        dataLength={data?.length}
      >
        {data?.map(({ id, title }, index) => (
          <TableRow className={"p-6 "} key={id}>
            <TableCell className="font-medium ">{index + 1}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{"name"} </TableCell>
            <TableCell>986933296</TableCell>
            <TableCell className={`flex justify-center`}>
              <TooltipButton
                onClick={() =>
                  navigate(PRODUCT_PATH.PRODUCT_DETAILS + "/" + id)
                }
                icon={<Eye />}
                title="التفاصيل"
                className="border-none items-start p-2 rounded-full hover:bg-accent"
              />
              <TooltipButton
                onClick={() => navigate(PRODUCT_PATH.EDIT_PRODUCT + "/" + id)}
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
      <DeleteDialog
        mutateFn={mutate}
        id={id}
        setId={setId}
        isPending={isPending}
        dialogKey="deleteProduct"
        titleToast="product.product"
        invalidateQueryKey={keys.getAllProduct._def}
      />
    </>
  );
};

export default Products;
