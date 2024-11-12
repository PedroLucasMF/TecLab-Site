'use client'

import { Card, Col, Container, Image, Row } from "react-bootstrap"
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

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

            <Col md={8} className="text-black">
              <h2>{jogador.nick}</h2>
              <h3>{jogador.nomeReal}</h3>
              <p>{jogador.idade}</p>
              <p>{jogador.pais}</p>
            </Col>
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Membro da Equipe</h2>
            {jogador.equipe && <>
              {jogador.equipe.map(item => (
                <div className="d-flex justify-content-center">
                  <Card>
                    <Card.Img variant="top" src={item.logo} />
                    <Card.Body>
                      <Card.Title>{item.nome}</Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </>}
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  )
}
