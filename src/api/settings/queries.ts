import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";

export const keys = createQueryKeys("Quizzes", {
  getAllQuizzes: () => ({
    queryFn: () => API.getAllQuizzes(),
    queryKey: [""],
  }),
  getQuizze: (id: string) => ({
    queryFn: () => API.getQuizze(id),
    queryKey: [id],
  }),
});

const queries = {
  GetAllQuizzes: () => useQuery(keys.getAllQuizzes()),
  GetQuizze: (id: string) => useQuery({ ...keys.getQuizze(id), enabled: !!id }),
  QuizzeAction: (id: string) =>
    useMutation({ mutationFn: id ? API.updateQuizze : API.addQuizze }),
  DeleteQuizze: () =>
    useMutation({
      mutationFn: API.deleteQuizze,
    }),
};

export default queries;
