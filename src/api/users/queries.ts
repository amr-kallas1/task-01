import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/react-query";
import API from "./api";

export const keys = createQueryKeys("Users", {
  getAllUser: () => ({
    queryFn: () => API.getAllUser(),
    queryKey: [""],
  }),
});

const queries = {
  GetAllUser: () => useQuery(keys.getAllUser()),
};

export default queries;
