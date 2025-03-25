import { IUpdateProduct } from "@/api/student/type";
import {
  numberValidation,
  reactSelectValidation,
  stringValidation,
} from "@/components/global/validation";
import { object } from "yup";

export type IActionProduct = Omit<IUpdateProduct, "category" | "id"> & {
  category: { label: string; value: string };
  price: number;
};

export const productDefaultValuesAction = {
  title: "",
  image: "",
  slug: "",
  price: 0,
  category: undefined,
};

export const productValues = (data: IUpdateProduct) => {
  if (data) {
    return {
      slug: data.slug,
      title: data.content,
      category: {
        label: data.category,
        value: data.category,
      },
      image: data.image,
    };
  }
};

export const productValidation = object().shape({
  slug: stringValidation,
});
