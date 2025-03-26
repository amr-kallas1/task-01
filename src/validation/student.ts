import { IGetStudent } from "@/api/student/type";
import {
  passwordValidation,
  stringValidation,
} from "@/components/global/validation";
import { object } from "yup";

export type IStudentForm = {
  name: string;
  email: string;
  password: string;
};

export const studentDefaultValues = {
  name: "",
  email: "",
  password: "",
};

export const studentValues = (values: IGetStudent) => {
  if (values)
    return {
      name: values.data.name,
      email: values.data.email,
      password: values.data.password,
    };
};

export const studentValidation = object().shape({
  name: stringValidation,
  email: stringValidation,
  password: passwordValidation,
});
