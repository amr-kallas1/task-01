import { useMutation } from "@tanstack/react-query";
import API from "./api";

const queries = {
  login: () => useMutation({ mutationFn: API.login }),
};

export default queries;
