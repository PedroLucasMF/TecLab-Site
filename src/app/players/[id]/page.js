'use client'

import { Card, Col, Container, Image, Row } from "react-bootstrap"
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import './style.css'
import Link from "next/link";

export default function Page({ params }) {

  const [jogador, setJogador] = useState({})

  useEffect(() => {
    apiESports.get(`/jogadores/${params.id}`).then(resultado => {
      setJogador(resultado.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="my-5 bg-body p-4 rounded-2">
          <Row>
            <Col md={4}>
              <Image src={jogador.foto} width={350} alt={jogador.nick} title={jogador.nick} />
            </Col>

            <Col md={4} className="text-black">
              <h1>{jogador.nick}</h1>
              <h3>Nome: {jogador.nomeReal}</h3>
              <h5 className="my-3">Idade: {jogador.idade}</h5>
              <p>Origem: <b>{jogador.pais}</b></p>
            </Col>

            <Col className="text-black" md={4}>
              <h3 className="d-flex justify-content-center mb-4">Membro da Equipe</h3>
              {jogador.equipe && <>
                {jogador.equipe.map(item => (
                  <div className="d-flex justify-content-center">
                    <Card>
                      <Link className="text-black" href={`/equipes/${item.id}`}>
                        <Card.Img variant="top" className="p-2" alt="logo" title={item.nome} src={item.logo} />
                        <Card.Body>
                          <Card.Title>{item.nome}</Card.Title>
                        </Card.Body>
                      </Link>
                    </Card>
                  </div>
                ))}
              </>}
            </Col>
          </Row>
        </div>
      </Container>
      <div className="footer-maldito">
        <Footer />
      </div>
    </>
  )
}
