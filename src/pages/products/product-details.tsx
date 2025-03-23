import queries from "@/api/product/queries";
import PageTitle from "@/components/global/page-title";
import ViewFieldContainer from "@/components/global/view-field-container";
import { Badge } from "@/components/ui/badge";
import BreadCrumbs from "@/components/ui/breadcrumb";
import Typography from "@/components/ui/typography";
import { PRODUCT_PATH } from "@/routes/path";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id = "" } = useParams();
  const { data: productDetails, isLoading } = queries.GetProduct(id);
  return (
    <>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[
            { label: "الطلاب", link: PRODUCT_PATH.PRODUCTS },
            {
              label: "تفاصيل الطالب",
              link: "",
            },
          ]}
        />
        <PageTitle title="الطلاب" subTitle="عرض تفاصيل الطالب" />
      </div>
      <div className="border border-gray-200 rounded-[10px] px-6">
        <ViewFieldContainer isLoading={isLoading} fieldName="رقم المعرف">
          <Typography>{productDetails?.id}</Typography>
        </ViewFieldContainer>
        <ViewFieldContainer isLoading={isLoading} fieldName={"الاسم"}>
          <Typography>{productDetails?.slug}</Typography>
        </ViewFieldContainer>
        <ViewFieldContainer isLoading={isLoading} fieldName={"Description"}>
          <Typography>{productDetails?.title}</Typography>
        </ViewFieldContainer>
        <ViewFieldContainer isLoading={isLoading} fieldName={"Category"}>
          <Badge variant={"secondary"} title={productDetails?.category ?? ""} />
        </ViewFieldContainer>
        <ViewFieldContainer isLoading={isLoading} fieldName={"Status"}>
          <Badge
            variant={productDetails?.status == "published" ? "success" : "red"}
            title={
              productDetails?.status == "published" ? "Active" : "Disabled"
            }
          />
        </ViewFieldContainer>
        <ViewFieldContainer isLoading={isLoading} fieldName={"PuplishedAt"}>
          <Typography>{productDetails?.publishedAt}</Typography>
        </ViewFieldContainer>

        <ViewFieldContainer isLoading={isLoading} fieldName={"UpdatedAt"}>
          <Typography>{productDetails?.updatedAt}</Typography>
        </ViewFieldContainer>
        <ViewFieldContainer isLoading={isLoading} fieldName={"Image"}>
          <img
            src={productDetails?.image}
            alt="Product Image"
            className="w-52 min-h-24 rounded-xl"
          />
        </ViewFieldContainer>
      </div>
    </>
  );
};

export default ProductDetails;
