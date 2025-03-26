import { IActionQuizze, IGetQuizze } from "@/api/settings/type";
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

export const settingValues = (values: IGetQuizze) => {
  if (values)
    return {
      name: values.data.name,
      duration: values.data.duration,
      numberOfAttempts: values.data.numberOfAttempts,
    };
};

export const settingValidation = object().shape({
  name: stringValidation,
  duration: numberValidation,
  numberOfAttempts: numberValidation,
});
