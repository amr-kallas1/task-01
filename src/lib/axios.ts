import { AUTH_PATH } from "@/routes/path";
import ax from "axios";
import { toast } from "sonner";

export const BACKEND_BASE_URL = "https://jsonplaceholder.ir/";

export const API_BASE_URL = BACKEND_BASE_URL ;

const axios = ax.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const pageNumber = new URLSearchParams(window.location.search).get("page");

  config.headers.Authorization = "Bearer " + localStorage.getItem("token");

  const requestParams = config.params;
  config.params = {
    ...requestParams,
    PageNumber: requestParams?.PageNumber || pageNumber || undefined,
  };
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (errors) => {
    if (errors?.response.status == 401) {
      localStorage.clear();
      window.location.href = `${AUTH_PATH.LOGIN}`;
    }
    if (errors?.response.data?.errorMessage)
      toast.error(errors?.response.data?.errorMessage);

    throw errors;
  }
);
export default axios;
