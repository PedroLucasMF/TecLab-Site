'use client'

import Footer from "@/app/components/Footer/Footer"
import Header from "@/app/components/Header/Header"
import { useEffect, useState } from "react"
import { Card, Col, Container, Form, Image, Row } from "react-bootstrap"
import { Rings } from "react-loader-spinner"
import './styleDash.css'
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa"
import apiESports from "@/services/apiESports"

export default function Page({ params }) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const loggedInUser = users.find(item => item.id == params.userId);

  const [loading, setLoading] = useState(true);

  const [jogos, setJogos] = useState({})
  const [equipes, setEquipes] = useState({})

  useEffect(() => {
    if (loggedInUser) {
      apiESports.get(`/jogos/${loggedInUser.jogo_fav}`).then(resultado => {
        setJogos(resultado.data);
      });
      apiESports.get(`/equipes/${loggedInUser.time_fav}`).then(resultado => {
        setEquipes(resultado.data);
      });
    }
  }, [])

  useEffect(() => {
    setTimeout(() => { setLoading(false); }, 2000);
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Rings height="100" width="100" color="#E43B14" ariaLabel="loading" />
      </div>
    );
  }

  if (!loggedInUser) {
    return <p>Usuário não encontrado.</p>;
  }

  return (
    <>
      <Header />
      <Container>

        <Row className='justify-content-center my-4 titulo'>
          <Col xs="auto">
            <h2>MEU PERFIL</h2>
          </Col>
        </Row>

        <section className="section about-section" id="about">
          <Container className="bg-body-tertiary rounded-bottom-4 rounded-top-4 borda-pontilhada mb-5 pb-5">
            <Row className="align-items-center flex-row-reverse">
              <Col lg={6}>
                <div className="about-text go-to">
                  <h3 className="dark-color">{loggedInUser.nome}</h3>
                  <h6 className="lead">{loggedInUser.nome_real}</h6>
                  <p>{loggedInUser.bio}</p>
                  <Row className="about-list">
                    <Col md={6}>
                      <div className="media">
                        <label>País</label>
                        <Image src={`https://flagsapi.com/${loggedInUser.pais}/flat/48.png`} alt="pais" title={loggedInUser.pais} />
                      </div>
                      <div className="media mt-5">
                        <Link href={`/user/${loggedInUser.id}`} className="btn btn-success w-50"><FaUserEdit size={30} /></Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col lg={6}>
                <div className="about-avatar p-5">
                  {loggedInUser && loggedInUser.imagem_perfil === '' ? (
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68D1zB62HiAWZAkQpessCgGpmfvJQUX8Rhg&s"
                      alt="Image Placeholder"
                    />
                  ) : (
                    <Image
                      src={loggedInUser.imagem_perfil}
                      className="rounded-2 foto-perfil w-100"
                      title="Foto de Perfil"
                      alt="Foto-usuario"
                    />
                  )}
                </div>
              </Col>
            </Row>

            <hr />

            <Row className="text-center">
              <Col md={6}>
                <h4>Jogo Favorito</h4>
                {/* Acessa apenas a propriedade específica `nome` */}
                {jogos &&
                  <>
                    <div>
                    <p>{jogos.nome}</p>
                      <Image width={200}
                        src={jogos.cover}
                        alt={jogos.nome}
                        title={jogos.nome}
                        className="image-zoom"
                      />
                    </div>
                  </>
                }
              </Col>
              <Col md={6}>
                <h4>Time Favorito</h4>
                {equipes &&
                  <div>
                    <p>{equipes.nome}</p>
                    <Image width={200}
                      src={equipes.logo}
                      alt={equipes.nome}
                      title={equipes.nome}
                      className="image-zoom" />
                  </div>
                }
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
      <Footer />
    </>
  )
}
