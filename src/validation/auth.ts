import { object } from "yup";
import {
  passwordValidation,
  stringValidation,
} from "@/components/global/validation";

export type ILoginForm = {
  userName: string;
  password: string;
};

export const LoginDefaultValues = {
  userName: "",
  password: "",
};

export const loginValidation = object().shape({
  userName: stringValidation,
  password: passwordValidation,
});
