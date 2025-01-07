import * as Yup from "yup";

const torneioValidator = Yup.object().shape({
  nome: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .required("O nome é obrigatório"),
  dataInicio: Yup.date()
    .required("A data de início é obrigatória")
    .typeError("Data inválida"),
  dataFim: Yup.date()
    .required("A data de encerramento é obrigatória")
    .typeError("Data inválida")
    .min(Yup.ref('dataInicio'), "A data de encerramento deve ser após a data de início"),
  jogoId: Yup.string()
    .required("É necessário selecionar um jogo"),
  logoCamp: Yup.string()
    .url("A URL do logo é inválida")
    .required("A URL do logo é obrigatória")
});

export default torneioValidator;