'use client'

import { Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import Header from "./components/Header/Header";
import './mainStyle.css';
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import apiESports from "@/services/apiESports";
import Link from "next/link";

export default function Home() {

  const [selectedGame, setSelectedGame] = useState(null);
  const [jogos, setJogos] = useState([]);
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    apiESports.get(`/jogos`).then(resultado => {
      setJogos(resultado.data.data);
    });
    apiESports.get(`/equipes`).then(resultado => {
      setEquipes(resultado.data.data);
    });
  }, []);

  const handleMouseEnter = async (game) => {
    try {
      const resultado = await apiESports.get(`/generos/${game.generoId}`);
      const genero = resultado.data.nome;

      setSelectedGame({ ...game, genero });
    } catch (error) {
      console.error("Erro ao buscar gênero:", error);
    }
  };

  const renderGameInfo = (game) => (
    <Card className="text-light bg-dark p-3">
      <Card.Body>
        <Card.Title className="text-success">{game.nome}</Card.Title>
        <div>
          <span>{game.genero}</span>
        </div>
        <Card.Img variant="top" src={game.foto} className="my-3" style={{ height: '200px', objectFit: 'fit' }} />
        <Card.Text>{game.descricao}</Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Populares no Momento</h1>
        <div className="d-flex justify-content-center">
          <Carousel className="w-75 carousel_background" fade indicators={false}>
            {jogos.map(item => (
              <Carousel.Item interval={3000}>
                <a href="#">
                  <Image className="d-block w-100 carousel_img" src={item.foto} />
                </a>
                <Carousel.Caption className="carousel_caption_area">
                  <h3>{item.nome}</h3>
                  <p className="texto-limitado-largura-fixa">{item.descricao}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <h2 className="d-flex justify-content-center my-5">Jogos Populares</h2>
        {jogos &&
          <Row className="g-4">
            <Col md={8}>
              <Row xs={1} md={3} className="g-4">
                {jogos.map((game, index) => (
                  <Col key={index}>
                    <Link href={`/jogos/${game.id}`}>
                      <Card
                        onMouseEnter={() => handleMouseEnter(game)}
                        style={{ height: '350px', width: '250px' }}
                      >
                        <Card.Img variant="top" src={game.cover} style={{ height: '350px', objectFit: 'fit' }} />
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={4}>
              {selectedGame ? renderGameInfo(selectedGame) : <p>Passe o mouse sobre um jogo para ver os detalhes.</p>}
            </Col>
          </Row>
        }

      </Container>
      <Footer />
    </>
  );
}
