'use client'

import { Card, Col, Container, Image, Row } from "react-bootstrap"
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export default function Page({ params }) {

  const [torneio, setTorneio] = useState({})

  useEffect(() => {
    apiESports.get(`/torneios/${params.id}`).then(resultado => {
      setTorneio(resultado.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="my-5 bg-body p-4 rounded-2">
          <Row>
            <Col md={4}>
              <Image src={torneio.logoCamp} width={350} alt={torneio.nome} title={torneio.nome} />
            </Col>

            <Col md={8} className="text-black">
              <>
                <h2>{torneio.nome}</h2>
                <h6>Inicio: {torneio.dataInicio}</h6>
                <h6>Fim: {torneio.dataFim}</h6>
              </>
            </Col>
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Equipes Participantes</h2>
            {torneio.equipes && <>
              {torneio.equipes.map(item => (
                <Col md={2}>
                  <Card>
                    <Card.Img variant="top" src={item.logo} />
                    <Card.Body>
                      <Card.Title>{item.nome}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>}
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Partidas</h2>
            {torneio.partidas && <>
              {torneio.partidas.map(item => (
                <p>
                  {item.dataPartida}
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
