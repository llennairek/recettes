import * as Yup from "yup";

const RegisterSchema = Yup.object({
  name: Yup.string()
    .required("Champs requis")
    .min(3, "Minimum de 3 caractères"),
  email: Yup.string().email("Email Invalide").required("Champs requis"),
  password: Yup.string()
    .required("Champs Requis")
    .min(6, "Minimum de 6 caractères"),
});

export default RegisterSchema;
