import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email Format"
    )
    .required("Email is Required."),
  password: Yup.string().required("Password is Required"),
});

export const SignUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email Format"
    )
    .required("Email is Required."),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Accepting alpha-numeric and special characters. Minimum limit is 8 characters"
    )
    .required("Password is Required."),
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Accepting only Letters.")
    .required("Family Name Required."),
  mobile: Yup.string()
    .matches(
      /^\+1\d{10}$/,
      "Invalid Phone Number Required +1. Should be of 10 Digits."
    )
    .required("Phone Number is Required."),
});