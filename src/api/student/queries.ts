import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";

export const keys = createQueryKeys("students", {
  getAllStudents: () => ({
    queryFn: API.getAllStudents,
    queryKey: [""],
  }),
  getStudent: (id: string) => ({
    queryFn: () => API.getStudent(id),
    queryKey: [id],
  }),
});

const queries = {
  GetAllStudents: () => useQuery(keys.getAllStudents()),
  GetStudent: (id: string) =>
    useQuery({ ...keys.getStudent(id), enabled: !!id }),
  StudentAction: (id: string) =>
    useMutation({ mutationFn: id ? API.updateStudent : API.addStudent }),
  DeleteStudent: () => useMutation({ mutationFn: API.deleteStudent }),
};

export default queries;
