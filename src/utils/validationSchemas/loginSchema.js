import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().email("Email Invalide").required("Champs requis"),
  password: Yup.string()
    .required("Champs Requis")
    .min(6, "Minimum de 6 caractères"),
});

export default LoginSchema;
