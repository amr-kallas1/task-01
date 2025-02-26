import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";

export const keys = createQueryKeys("product", {
  getAllProduct: () => ({
    queryFn: API.getAllProducts,
    queryKey: [""],
  }),
  getProduct: (id: string) => ({
    queryFn: () => API.getProduct(id),
    queryKey: [id],
  }),
});

const queries = {
  GetAllProduct: () => useQuery(keys.getAllProduct()),
  GetProduct: (id: string) =>
    useQuery({ ...keys.getProduct(id), enabled: !!id }),
  ProductAction: (id: string) =>
    useMutation({ mutationFn: id ? API.updateProduct : API.addProduct }),
  DeleteProduct: () => useMutation({ mutationFn: API.deleteProduct }),
};

export default queries;
