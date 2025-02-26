import { number, object, string } from "yup";

export const reactSelectValidation = 
  object()
    .shape({
      label: string(),
      value: string(),
    })
    .test({
      message: "this field is required",
      test: ({ value }) => {
        return !!value;
      },
    });

export const stringValidation = string().required("this field is required");

export const passwordValidation = string().test({
  message: "at least 6 character",
  test: (value) => {
    return value
      ? value.length >= 6
        ? true
        : false
      : value && value?.length >= 6
      ? true
      : false;
  },
});

export const numberValidation = number()
  .transform((value) => {
    return value === "" || Number.isNaN(value) ? null : value;
  })
  .required("this field is required")
  .positive("enter valid number");
