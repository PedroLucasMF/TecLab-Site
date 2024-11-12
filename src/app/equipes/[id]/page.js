'use client'

import { Card, Col, Container, Image, Row } from "react-bootstrap"
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export default function Page({ params }) {

  const [equipe, setEquipe] = useState({})

  useEffect(() => {
    apiESports.get(`/equipes/${params.id}`).then(resultado => {
      setEquipe(resultado.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="my-5 bg-body p-4 rounded-2">
          <Row>
            <Col md={4}>
              <Image src={equipe.logo} width={350} alt={equipe.nome} title={equipe.nome} />
            </Col>

            <Col md={8} className="text-black">
              <>
                <h2>{equipe.nome}</h2>
                <h3>{equipe.regiao}</h3>
              </>
            </Col>
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Integrantes</h2>
            {equipe.jogadores && <>
              {equipe.jogadores.map(item => (
                <Col md={2}>
                  <Card>
                    <Card.Img variant="top" src={item.foto} />
                    <Card.Body>
                      <Card.Title>{item.nick}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>}
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Torneios</h2>
            {equipe.torneios && <>
              {equipe.torneios.map(item => (
                <p>
                  {item.nome}
                </p>
              ))}
            </>}
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  )
}
