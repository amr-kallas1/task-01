import queries, { keys } from "@/api/product/queries";
import DeleteDialog from "@/components/global/delete-dialog";
import PageTitle from "@/components/global/page-title";
import ReactHelmet from "@/components/global/react-helmet";
import TooltipButton from "@/components/global/tooltipButton";
import Eye from "@/components/icons/eye";
import Pencil from "@/components/icons/pencil";
import Trash from "@/components/icons/trash";
import Table from "@/components/table/table";
import { Badge } from "@/components/ui/badge";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { permissionsOptions } from "@/constants/static-options";
import { useOpenDeleteDialogContext } from "@/context/openDeleteDialog";
import { usePermissionContext } from "@/context/permissionContext";
import { PRODUCT_PATH } from "@/routes/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let columns = [
  {
    title: "#",
  },
  {
    title: "Name",
    className: "text-center",
  },
  {
    title: "Content",
  },
  {
    title: "Category",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
    className: "text-center",
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number | null>(null);
  const { setOpenDeleteDialog } = useOpenDeleteDialogContext();
  const { permissions } = usePermissionContext();
  const { data, isLoading, isError } = queries.GetAllProduct();
  const { mutate, isPending } = queries.DeleteProduct();

  const handleDelete = (id: number) => {
    setId(id);
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <ReactHelmet name="products">
        <title>Products</title>
      </ReactHelmet>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[{ label: "Products", link: PRODUCT_PATH.PRODUCTS }]}
        />
        <div className="flex justify-between items-start">
          <PageTitle title="Products" subTitle="view and manage products" />
          {Array.isArray(permissions) &&
            permissions.includes(permissionsOptions.product.set) && (
              <Button
                buttonContainerClass="gap-1"
                variant="add"
                onClick={() => navigate(PRODUCT_PATH.ADD_PRODUCT)}
              >
                Add Product
              </Button>
            )}
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
        {data?.map(({ id, slug, category, title, status }, index) => (
          <TableRow className={"p-6"} key={id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="text-center">{slug}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>
              {status == "published" ? (
                <Badge variant={"success"} title="Active" />
              ) : (
                <Badge variant={"red"} title="Disabled" />
              )}
            </TableCell>

            <TableCell className={`flex justify-center`}>
              <TooltipButton
                onClick={() =>
                  navigate(PRODUCT_PATH.PRODUCT_DETAILS + "/" + id)
                }
                icon={<Eye />}
                title="Detail"
                className="border-none items-start p-2 rounded-full hover:bg-accent"
              />
              {permissions?.includes(permissionsOptions.product.set) && (
                <TooltipButton
                  onClick={() => navigate(PRODUCT_PATH.EDIT_PRODUCT + "/" + id)}
                  icon={<Pencil />}
                  title="Edit Details"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
              )}

              {permissions?.includes(permissionsOptions.product.delete) && (
                <TooltipButton
                  onClick={() => handleDelete(id)}
                  icon={<Trash />}
                  title="Delete"
                  className="border-none items-start p-2 rounded-full hover:bg-accent"
                />
              )}
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
