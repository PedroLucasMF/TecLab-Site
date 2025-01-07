import * as Yup from 'yup';

const jogosValidator = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é obrigatório.')
    .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  descricao: Yup.string()
    .required('A descrição é obrigatória.')
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  generoId: Yup.string()
    .required('O gênero é obrigatório.'),
  foto: Yup.string()
    .url('A foto deve ser uma URL válida.')
    .required('A foto é obrigatória.'),
  cover: Yup.string()
    .url('A capa deve ser uma URL válida.')
    .required('A capa é obrigatória.'),
});

export default jogosValidator;