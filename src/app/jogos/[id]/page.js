'use client'

import { Col, Container, Image, Row } from "react-bootstrap"
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export default function Page({ params }) {

  const [jogo, setJogo] = useState({})

  useEffect(() => {
    apiESports.get(`/jogos/${params.id}`).then(resultado => {
      setJogo(resultado.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="my-5 bg-body p-4 rounded-2">
          <Row>
            <Col md={4}>
              <Image src={jogo.cover} width={350} alt={jogo.nome} title={jogo.nome} />
            </Col>

            <Col md={8} className="text-black">
              {jogo.genero &&
                <>
                  <h2>{jogo.nome}</h2>
                  <h3>{jogo.genero.nome}</h3>
                  <p>{jogo.descricao}</p>
                </>
              }
            </Col>
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Torneios</h2>
            {jogo.torneios && <>
              {jogo.torneios.map(item => (
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
