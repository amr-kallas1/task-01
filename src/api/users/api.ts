import API_ROUTES from "@/constants/apiRoutes";
import axios from "@/lib/axios";
import {
  IGetAllUser
} from "./type";

const API = {
  getAllUser: async () => {
    const { data } = await axios<IGetAllUser>(API_ROUTES.USER.GET_ALL_USER);
    return data?.splice(0,10);
  },
};

export default API;
