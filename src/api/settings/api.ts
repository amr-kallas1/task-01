import API_ROUTES from "@/constants/apiRoutes";
import axios from "@/lib/axios";
import { IActionQuizze, IGetAllQuizzes, IGetQuizze } from "./type";

const API = {
  getAllQuizzes: async () => {
    const { data } = await axios<IGetAllQuizzes>(
      API_ROUTES.SETTINGS.GET_ALL_QUIZZES
    );
    return data;
  },
  getQuizze: async (id: string) => {
    const { data } = await axios<IGetQuizze>(
      API_ROUTES.SETTINGS.GET_QUIZZE(id)
    );
    return data;
  },
  addQuizze: async (body: IActionQuizze) => {
    const { data } = await axios.post(API_ROUTES.SETTINGS.ADD_QUIZZE, body);
    return data;
  },
  updateQuizze: async (body: IActionQuizze) => {
    const { data } = await axios.patch(
      API_ROUTES.SETTINGS.UPDATE_QUIZZE(body.id ?? ""),
      { ...body, id: undefined }
    );
    return data;
  },
  deleteQuizze: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.SETTINGS.DELETE_QUIZZE(id));
    return data;
  },
};

export default API;
