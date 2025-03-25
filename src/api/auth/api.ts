import API_ROUTES from "@/constants/apiRoutes";
import axios from "@/lib/axios";
import { ILogin, ILoginResponse } from "./type";

const API = {
  login: async (body: ILogin) => {
    const { data } = await axios.post<ILoginResponse>(
      API_ROUTES.AUTH.login,
      body
    );
    return data;
  },
};
export default API;
