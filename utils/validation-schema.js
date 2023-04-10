import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Полето трябва да съдържа валиден имайл адрес")
    .max(255)
    .required("Това поле е задължително"),
  password: yup
    .string()
    .min(6, "Паролата трябва съдържа повече от 6 символа")
    .max(32)
    .required("Това поле е задължително"),
  confirmPassword: yup
    .string()
    .min(6, "Паролата трябва съдържа повече от 6 символа")
    .max(32)
    .oneOf([yup.ref("password"), null], "Паролите не съвпадат")
    .required("Това поле е задължително"),
});

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Това поле е задължително"),
  password: yup
    .string("Паролата")
    .min(6, "Паролата трябва съдържа повече от 6 символа")
    .max(32)
    .required("Това поле е задължително"),
});

export const NewPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Паролата трябва съдържа повече от 6 символа")
    .max(32)
    .required("Това поле е задължително"),
  newpassword: yup
    .string()
    .min(6, "Паролата трябва съдържа повече от 6 символа")
    .max(32)
    .oneOf([yup.ref("password"), null], "Паролите не съвпадат")
    .required("Това поле е задължително"),
});

export const ResetPasswordValidationSchema = yup.object().shape({
  username: yup.string().required("Това поле е задължително"),
});

export const ConfirmPasswordValidationSchema = yup.object().shape({
  username: yup.string().required("Това поле е задължително"),
  code: yup.string().required("Това поле е задължително"),
  password: yup
    .string("Паролата")
    .min(6, "Паролата трябва съдържа повече от 6 символа")
    .max(32)
    .required("Това поле е задължително"),
  newpassword: yup
    .string()
    .min(6, "Паролата трябва съдържа повече от 6 символа")
    .max(32)
    .oneOf([yup.ref("password"), null], "Паролите не съвпадат")
    .required("Това поле е задължително"),
});
