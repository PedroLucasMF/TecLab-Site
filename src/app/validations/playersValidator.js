import * as Yup from 'yup';

const playerValidationSchema = Yup.object().shape({
  nick: Yup.string()
    .required('O campo "Nick" é obrigatório.')
    .min(3, 'O "Nick" deve ter pelo menos 3 caracteres.'),
  nome_real: Yup.string()
    .required('O campo "Nome Real" é obrigatório.')
    .min(5, 'O "Nome Real" deve ter pelo menos 5 caracteres.'),
  idade: Yup.number()
    .typeError('O campo "Idade" deve ser um número.')
    .required('O campo "Idade" é obrigatório.')
    .min(10, 'A "Idade" deve ser maior ou igual a 10.')
    .max(100, 'A "Idade" deve ser menor ou igual a 100.'),
  pais: Yup.string()
    .required('O campo "País" é obrigatório.')
    .min(2, 'O "País" deve ter pelo menos 2 caracteres.'),
  foto: Yup.string()
    .url('A "Foto" deve conter uma URL válida.')
    .required('O campo "Foto" é obrigatório.'),
});

export default playerValidationSchema;