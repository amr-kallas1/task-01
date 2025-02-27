import queries, { keys } from "@/api/product/queries";
import { IUpdateProduct } from "@/api/product/type";
import PageTitle from "@/components/global/page-title";
import ReactHelmet from "@/components/global/react-helmet";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFReactSelect from "@/components/hook-form/RHFMultiSelect";
import RHFTextArea from "@/components/hook-form/RHFTextArea";
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

const ProductAction = () => {
  const { openSidebar } = useOpenSidebarContext();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: productDetails, isLoading } = queries.GetProduct(id);
  const { mutate, isPending } = queries.ProductAction(id);

  const { handleSubmit, control, reset,setValue } = useForm<IActionProduct>({
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

    mutate(body, {
      onSuccess: () => {
        toast.success(
          id
            ? "the product has been edited successfully"
            : "the product has been added successfully"
        );
        queryClient.invalidateQueries({ queryKey: keys.getAllProduct._def });
        queryClient.invalidateQueries({ queryKey: keys.getProduct._def });
        navigate(PRODUCT_PATH.PRODUCTS);
      },
    });
  };

  return (
    <div>
      <ReactHelmet name="products">
        <title>{id ? "Edit Product" : "Add Product"}</title>
      </ReactHelmet>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[
            { label: "Product", link: PRODUCT_PATH.PRODUCTS },
            {
              label: `${id ? "Edit Product" : "Add Product"}`,
              link: "",
            },
          ]}
        />
        <div className="flex justify-between items-start">
          <PageTitle
            title={`${id ? "Edit Product" : "Add Product"}`}
            subTitle={`${id ? "update your product" : "add your product"}`}
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
            name="slug"
            control={control}
            label="Name"
            placeholder="Enter name of product"
          />
          <RHFTextField
            isLoading={isLoading}
            name="price"
            control={control}
            label="Price"
            type="number"
            placeholder="Enter the price"
          />

          <RHFReactSelect
            control={control}
            name="category"
            skeleton={isLoading}
            isLoading={false}
            label="Category"
            placeholder="choose your category"
            options={[
              {
                label: "Lorem",
                value: "Lorem",
              },
              {
                label: "Food",
                value: "Food",
              },
              {
                label: "Soups",
                value: "Soups",
              },
            ]}
          />

          <RHFTextArea
            name="title"
            control={control}
            label="Content"
            placeholder="Enter the content"
            isLoading={isLoading}
          />

          <RHFInputFile
            control={control}
            name="image"
            setValue={setValue}
            isMulti
            isLoading={isLoading}
            label="Image"
          />
          <div className="flex gap-4 w-[90%] flex-col-reverse justify-center items-center mx-auto mt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(PRODUCT_PATH.PRODUCTS)}
            >
              Back
            </Button>
            <Button isLoading={isPending} className="w-full">
              {id ? "Edit Product" : "Add Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductAction;
