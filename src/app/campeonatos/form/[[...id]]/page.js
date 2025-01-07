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
import torneioValidator from "@/app/validations/torneioValidator";


export default function Page({ params }) {
  const route = useRouter();
  const searchParams = useSearchParams();

  const [torneio, setTorneio] = useState({ nome: '', dataInicio: '', dataFim: '', jogoId: '', logoCamp: '' });
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(false);

  // Carregar dados do torneio para edição, se houver um ID
  useEffect(() => {
    if (params.id) {
      setLoading(true);
      apiESports.get(`torneios/${params.id}`)
        .then(response => {
          setTorneio(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao carregar dados do torneio:', error);
          setLoading(false);
        });
    }

    apiESports.get(`/jogos`).then(response => {
      setJogos(response.data.data)
    })

  }, [params.id]);

  // Função para salvar (criar ou atualizar) o torneio
  const salvar = async (dados) => {
    try {
      if (params.id) {
        // Atualizar torneio existente
        await apiESports.put(`torneios/${params.id}`, dados);
      } else {
        // Criar novo torneio
        await apiESports.post('torneios/', dados);
      }
      route.push('/campeonatos');
    } catch (error) {
      console.error('Erro ao salvar dados do torneio:', error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center my-3 texto-custom'>
          <h2>{params.id ? 'EDITAR TORNEIO' : 'CRIAR TORNEIO'}</h2>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Formik
            initialValues={torneio}
            enableReinitialize
            validationSchema={torneioValidator}
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
                    <Form.Group as={Row} className="mb-4" controlId="nome">
                      <Form.Label column sm="1"><b>Nome:</b> </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          name="nome"
                          value={values.nome}
                          onChange={handleChange('nome')}
                          isInvalid={touched.nome && !!errors.nome}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="dataInicio">
                      <Form.Label column sm='3'><b>Data de Início:</b> </Form.Label>
                      <Col sm='8'>
                        <Form.Control
                          type="date"
                          name="dataInicio"
                          value={values.dataInicio}
                          onChange={handleChange('dataInicio')}
                          isInvalid={touched.dataInicio && !!errors.dataInicio}
                        />
                        <Form.Control.Feedback type="invalid">{errors.dataInicio}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="dataFim">
                      <Form.Label column sm='3'><b>Encerramento:</b> </Form.Label>
                      <Col sm='8'>
                        <Form.Control
                          type="date"
                          name="dataFim"
                          value={values.dataFim}
                          onChange={handleChange('dataFim')}
                          isInvalid={touched.dataFim && !!errors.dataFim}
                        />
                        <Form.Control.Feedback type="invalid">{errors.dataFim}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="jogoId">
                      <Form.Label column sm='1'><b>Jogo:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Select
                          name="jogoId"
                          value={values.jogoId}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('jogoId', e.target.value);
                          }}
                          isInvalid={touched.jogoId && !!errors.jogoId}
                        >
                          <option>Selecionar</option>
                          {jogos.map(item => (
                            <option key={item.id} value={item.id}>{item.nome}</option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.jogoId}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="logoCamp">
                      <Form.Label column sm='1'><b>Logo:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type="text"
                          name="logoCamp"
                          placeholder="Url da Imagem"
                          value={values.logoCamp}
                          onChange={handleChange('logoCamp')}
                          isInvalid={touched.logoCamp && !!errors.logoCamp}
                        />
                        <Form.Control.Feedback type="invalid">{errors.logoCamp}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <div className='d-flex justify-content-center align-items-center my-5 texto-custom'>
                      <h4>PREVIEW DA LOGO <ImArrowRight size={50} /></h4>
                    </div>
                  </Col>

                  <Col>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                      {values.logoCamp ? (
                        <Image src={values.logoCamp} alt="Preview Foto" className="imagem_produto_preview" />
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
                  <Link href={'/campeonatos'} className="btn btn-danger ms-2">
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
