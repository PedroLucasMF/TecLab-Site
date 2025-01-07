import * as Yup from 'yup'

const UserValidator = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  nome_real: Yup.string().max(50, "Limite de 50 caracteres"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  imagem_perfil: Yup.string().url("URL da imagem inválida").notRequired(),
  bio: Yup.string().max(300, "Limite de 300 caracteres")
});

export default UserValidator