import API_ROUTES from "@/constants/apiRoutes";
import axios from "@/lib/axios";
import {
  IAddProduct,
  IGetAllProduct,
  IGetProductById,
  IUpdateProduct
} from "./type";

const API = {
  getAllProducts: async () => {
    const { data } = await axios<IGetAllProduct>(
      API_ROUTES.PRODUCT.GET_ALL_PRODUCTS
    );
    return data?.splice(0,10);
  },
  getProduct: async (id: string) => {
    const { data } = await axios<IGetProductById>(
      API_ROUTES.PRODUCT.GET_PRODUCT + `/${id}`
    );
    return data;
  },
  addProduct: async (body: IAddProduct) => {
    const { data } = await axios.post(API_ROUTES.PRODUCT.ADD_PRODUCT, body);
    return data;
  },
  updateProduct: async (body: IUpdateProduct) => {
    const { data } = await axios.put(
      API_ROUTES.PRODUCT.UPDATE_PRODUCT + `/${body.id}`,
      body
    );
    return data;
  },
  deleteProduct: async (id: number) => {
    const { data } = await axios.delete(
      API_ROUTES.PRODUCT.DELETE_PRODUCT + `/${id}`
    );
    return data;
  },
};

export default API;
