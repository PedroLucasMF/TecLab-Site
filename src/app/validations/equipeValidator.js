import * as Yup from "yup";

const equipeValidator = Yup.object().shape({
  nome: Yup.string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(50, "O nome deve ter no máximo 50 caracteres."),
  regiao: Yup.string()
    .required("A região é obrigatória.")
    .min(2, "A região deve ter no mínimo 2 caracteres.")
    .max(50, "A região deve ter no máximo 50 caracteres."),
  logo: Yup.string()
    .url("A URL da logo deve ser válida.")
    .required("A logo é obrigatória."),
});

export default equipeValidator;