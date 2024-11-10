'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Row, Col, Container, InputGroup, Image } from "react-bootstrap";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import ReactInputMask from "react-input-mask";
import './styleUser.css'
import { ImArrowRight } from "react-icons/im";
import UserValidator from "@/app/validations/UserValidator";
import Swal from "sweetalert2";

export default function Page({ params }) {

  const route = useRouter();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const dados = users.find(item => item.id == params.id);
  const user = dados || { nome: '', nome_real: '', email: '', imagem_perfil: '', bio: '', pais: '' };

  //A API VAI DEIXAR MUITO LERDO ENTAO O JEITO É FAZER ISSO AQ MESMO
  const countries = [
    { name: "Brazil", code: "BR" },
    { name: "Argentina", code: "AR" },
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Mexico", code: "MX" },
    { name: "Germany", code: "DE" },
    { name: "France", code: "FR" },
    { name: "United Kingdom", code: "GB" },
    { name: "Italy", code: "IT" },
    { name: "Spain", code: "ES" },
    { name: "China", code: "CN" },
    { name: "Japan", code: "JP" },
    { name: "Australia", code: "AU" },
    { name: "India", code: "IN" },
    { name: "Russia", code: "RU" },
    { name: "South Korea", code: "KR" },
    { name: "South Africa", code: "ZA" },
    { name: "Egypt", code: "EG" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Turkey", code: "TR" }
  ];

  function salvar(dados) {
    if (user.id) {
      Object.assign(user, dados);
    } else {
      users.push(dados);
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(dados));

    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'As mudanças foram salvas com sucesso.',
      timer: 1000,
      showConfirmButton: false,
      willClose: () => {
        route.push('/userDashboard/' + params.id);
      }
    });
  }

  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center my-5 title-enderecos'>
          <h4>Gerenciar Dados Cadastrados</h4>
        </div>

        <Formik
          initialValues={user}
          validationSchema={UserValidator}
          onSubmit={values => salvar(values)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched
          }) => {
            return (
              <Form className="bg-body p-3 rounded-bottom-4 rounded-top-4">
                <Row>
                  <Col>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      {values && values.imagem_perfil === '' ? (
                        <h2 className="text-danger imagem_produto_preview_no_image">Sem Imagem!</h2>
                      ) : (
                        <Image src={values.imagem_perfil} alt="Preview" className="imagem_perfil_preview" />

                      )}
                    </div>
                  </Col>

                  <Col>

                    <Form.Group as={Row} className="mb-4" controlId="nome">
                      <Form.Label column sm="1"><b>Nome:</b> </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          name="nome"
                          value={values.nome}
                          onChange={handleChange('nome')}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="nome_real">
                      <Form.Label column sm="3"><b>Nome Verdadeiro:</b> </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          name="nome_real"
                          value={values.nome_real}
                          onChange={handleChange('nome_real')}
                        />
                      </Col>
                      <Form.Control.Feedback type="invalid">{errors.nome_real}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="bio">
                      <Form.Label column sm='1'><b>Bio:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Limite de 300 caracteres!!!"
                          name="bio"
                          value={values.bio}
                          onChange={handleChange('bio')}
                          isInvalid={touched.bio && !!errors.bio}
                        />
                        <Form.Control.Feedback type="invalid">{errors.bio}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="pais">
                      <Form.Label column sm='1'><b>País:</b> </Form.Label>
                      <Col sm='6'>
                        <Form.Select
                          name="pais"
                          value={values.pais}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('pais', e.target.value);
                          }}
                          isInvalid={touched.pais && !!errors.pais}
                        >
                          <option>Selecionar Pais</option>
                          {countries.map(item => (
                            <option value={item.code}>{item.name} - {item.code}</option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.pais}</Form.Control.Feedback>
                      </Col>
                      <Col md='3'>
                        <div className="d-flex justify-content-center align-items-center">
                          {values && values.pais === '' || values.pais === undefined ? (
                            <></>
                          ) : (
                            <Image src={`https://flagsapi.com/${values.pais}/flat/48.png`} />
                          )}
                        </div>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="email">
                      <Form.Label column sm="1"><b>Email:</b> </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange('email')}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="imagem_perfil">
                      <Form.Label column sm='1'><b>Foto:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type="text"
                          name="imagem_perfil"
                          placeholder="Url da Imagem"
                          value={values.imagem_perfil}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('imagem_perfil', e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>

                  </Col>

                </Row>

                <hr />

                <Row className="text-center">
                  <Col md={4}>
                    <h4>Jogo Favorito</h4>
                  </Col>
                  <Col md={4}>
                    <h4>Time Favorito</h4>
                  </Col>
                  <Col md={4}>
                    <h4>Jogador Favorito</h4>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button onClick={handleSubmit} variant="success">
                    <FaCheck /> Salvar
                  </Button>
                  <Link
                    href={`/userDashboard/${params.id}`}
                    className="btn btn-danger ms-2"
                  >
                    <MdOutlineArrowBack /> Voltar
                  </Link>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Container>
      <Footer />
    </>
  );
}
