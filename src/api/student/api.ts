import API_ROUTES from "@/constants/apiRoutes";
import axios from "@/lib/axios";
import { IActionStudent, IGetAllStudent, IGetStudent } from "./type";

const API = {
  getAllStudents: async () => {
    const { data } = await axios<IGetAllStudent>(
      API_ROUTES.STUDENT.GET_ALL_STUDENTS
    );
    return data;
  },
  getStudent: async (id: string) => {
    const { data } = await axios<IGetStudent>(
      API_ROUTES.STUDENT.GET_STUDENT(id)
    );
    return data;
  },
  addStudent: async (body: IActionStudent) => {
    const { data } = await axios.post(API_ROUTES.STUDENT.ADD_STUDENT, body);
    return data;
  },
  updateStudent: async (body: IActionStudent) => {
    const { data } = await axios.patch(
      API_ROUTES.STUDENT.UPDATE_STUDENT(body.id ?? ""),
      { ...body, id: undefined }
    );
    return data;
  },
  deleteStudent: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.STUDENT.DELETE_STUDENT(id));
    return data;
  },
};

export default API;
