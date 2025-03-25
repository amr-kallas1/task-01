import { object } from "yup";
import {
  passwordValidation,
  stringValidation,
} from "@/components/global/validation";


export const LoginDefaultValues = {
  email: "",
  password: "",
};

export const loginValidation = object().shape({
  email: stringValidation,
  password: passwordValidation,
});
