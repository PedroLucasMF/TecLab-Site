'use client';

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { ImArrowRight } from "react-icons/im";
import { MdOutlineArrowBack } from "react-icons/md";
import apiESports from "@/services/apiESports";
import playerValidationSchema from "@/app/validations/playersValidator";

export default function Page({ params }) {
  const route = useRouter();
  const searchParams = useSearchParams();

  const [produto, setProduto] = useState({ nome_real: '', nick: '', idade: '', pais: '', foto: '' });
  const [loading, setLoading] = useState(false);

  // Carregar dados do produto para edição, se houver um ID
  useEffect(() => {
    if (params.id) {
      setLoading(true);
      apiESports.get(`jogadores/${params.id}`)
        .then(response => {
          setProduto(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao carregar dados do produto:', error);
          setLoading(false);
        });
    }
  }, [params.id]);

  // Função para salvar (criar ou atualizar) o produto
  const salvar = async (dados) => {
    try {
      if (params.id) {
        // Atualizar produto existente
        await apiESports.put(`jogadores/${params.id}`, dados);
      } else {
        // Criar novo produto
        await apiESports.post('jogadores/', dados);
      }
      route.push('/players');
    } catch (error) {
      console.error('Erro ao salvar dados do produto:', error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center my-3 texto-custom'>
          <h2>{params.id ? 'EDITAR JOGADOR' : 'CRIAR JOGADOR'}</h2>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Formik
            initialValues={produto}
            enableReinitialize
            validationSchema={playerValidationSchema}
            onSubmit={values => salvar(values)}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue
            }) => (
              <Form className="my-3" onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="nick">
                      <Form.Label column sm="1"><b>Nick:</b> </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          name="nick"
                          value={values.nick}
                          onChange={handleChange('nick')}
                          isInvalid={touched.nick && !!errors.nick}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nick}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="nome_real">
                      <Form.Label column sm="3"><b>Nome Real:</b> </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          name="nome_real"
                          value={values.nome_real}
                          onChange={handleChange('nome_real')}
                          isInvalid={touched.nome_real && !!errors.nome_real}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nome_real}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="idade">
                      <Form.Label column sm='1'><b>Idade:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type="text"
                          name="idade"
                          value={values.idade}
                          onChange={handleChange('idade')}
                          isInvalid={touched.idade && !!errors.idade}
                        />
                        <Form.Control.Feedback type="invalid">{errors.idade}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="pais">
                      <Form.Label column sm='1'><b>País:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type="text"
                          name="pais"
                          placeholder="Digitar nome do País"
                          value={values.pais}
                          onChange={handleChange('pais')}
                          isInvalid={touched.pais && !!errors.pais}
                        />
                        <Form.Control.Feedback type="invalid">{errors.pais}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="foto">
                      <Form.Label column sm='1'><b>Foto:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type="text"
                          name="foto"
                          placeholder="Url da Foto"
                          value={values.foto}
                          onChange={handleChange('foto')}
                          isInvalid={touched.foto && !!errors.foto}
                        />
                        <Form.Control.Feedback type="invalid">{errors.foto}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <div className='d-flex justify-content-center align-items-center my-5 texto-custom'>
                      <h4>PREVIEW DA FOTO <ImArrowRight size={50} /></h4>
                    </div>
                  </Col>

                  <Col>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                      {values.foto ? (
                        <Image src={values.foto} alt="Preview Foto" className="imagem_produto_preview" />
                      ) : (
                        <h2 className="text-danger imagem_produto_preview_no_image">Sem Foto!</h2>
                      )}
                    </div>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button type="submit" variant="success">
                    <FaCheck /> Salvar
                  </Button>
                  <Link href={'/players'} className="btn btn-danger ms-2">
                    <MdOutlineArrowBack /> Voltar
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Container>
      <Footer />
    </>
  );
}
