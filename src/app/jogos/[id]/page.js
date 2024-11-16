'use client'

import { Card, Col, Container, Image, Row } from "react-bootstrap"
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import './style.css'

export default function Page({ params }) {

  const [jogo, setJogo] = useState({})
  const [torneiosIds, setTorneiosIds] = useState([])
  const [torneiosComEquipes, setTorneiosComEquipes] = useState([])

  useEffect(() => {
    apiESports.get(`/jogos/${params.id}`).then((resultado) => {
      const torneiosIds = resultado.data.torneios.map((torneio) => torneio.id);
      setTorneiosIds(torneiosIds);
      setJogo(resultado.data)

      Promise.all(
        torneiosIds.map((id) =>
          apiESports.get(`/torneios/${id}`).then((res) => res.data)
        )
      ).then((torneios) => {
        setTorneiosComEquipes(torneios);
      });
    });
  }, []);

  console.log(torneiosComEquipes)

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
              <Row>
                <Col md={12}>
                  {jogo.genero &&
                    <>
                      <h2 className="text-black">{jogo.nome}</h2>
                      <h3>{jogo.genero.nome}</h3>
                      <p className="mt-3">{jogo.descricao}</p>
                    </>
                  }
                </Col>

                <Col className="mt-3" md={12}>
                  <h4>Equipes:</h4>
                  {torneiosComEquipes.map((torneio) => (
                    <>
                      {torneio.equipes.map((equipe) => (
                        <div key={equipe.id} className="d-flex d-inline-flex mx-2">
                          <Link href={`/equipes/${equipe.id}`}>
                            <img src={equipe.logo} title={equipe.nome} alt={equipe.nome} style={{ width: 50 }} />
                          </Link>
                        </div>
                      ))}
                    </>
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center text-black mb-3">Torneios</h2>
            <div className="d-flex justify-content-center">
              {jogo.torneios && <>
                <Col md={3}>
                  {jogo.torneios.map(item => (
                    <Link href={`/campeonatos/${item.id}`}>
                      <Card>
                        <Card.Img variant="top" src={item.logoCamp} className='p-2 game-card-img' />
                        <Card.Body className="d-flex justify-content-center">
                          <Card.Title className='text-black'>{item.nome}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </Col>
              </>}
            </div>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  )
}
