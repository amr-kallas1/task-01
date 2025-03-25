import { IActionQuizze } from "@/api/settings/type";
import {
  numberValidation,
  stringValidation,
} from "@/components/global/validation";
import { object } from "yup";

export type IQuizzeForm = Omit<IActionQuizze, "status" | "id">;

export const settingDefaultValues = {
  name: "",
  duration: 0,
  numberOfAttempts: 0,
};

export const settingValidation = object().shape({
  name: stringValidation,
  duration: numberValidation,
  numberOfAttempts: numberValidation,
});
