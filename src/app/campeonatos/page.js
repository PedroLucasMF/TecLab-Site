"use client";

import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useState } from "react"; // Importando useState para o carousel circular

export default function Page() {
  // Carousel Circular de Imagens
  const images = [
    "https://mmorpgbr.com.br/wp-content/uploads/2022/02/league-of-legends-2022-patch-schedule-all-lol-season-12-updates-changes.jpeg",
    "https://via.placeholder.com/300/FF5733",
    "https://via.placeholder.com/300/33C4FF",
    "https://via.placeholder.com/300/FF33E4",
    "https://via.placeholder.com/300/85FF33",
    "https://via.placeholder.com/300/FFC733",
    "https://via.placeholder.com/300/3346FF",
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Começa no primeiro conjunto de imagens

  const visibleImages = 5; // Número de imagens visíveis ao mesmo tempo

  // Função para ir para a próxima imagem
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length // Volta para o início ao chegar no final
    );
  };

  // Função para voltar para a imagem anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length // Volta para o final ao chegar no início
    );
  };

  // Lógica para pegar as 5 imagens (duas anteriores, atual, e duas seguintes)
  const getVisibleImages = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      visible.push(images[(currentIndex + i + images.length) % images.length]);
    }
    return visible;
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <h1 className="d-flex justify-content-center my-4">Campeonatos</h1>

          <div
            style={{
              backgroundColor: "grey",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            <Col>
              <h2>Populares</h2>
            </Col>

            <Col
              style={{
                alignItems: "center",
                textAlign: "center",
                paddingLeft: "270px",
              }}
            >
              <Carousel
                className="w-75 carousel_background"
                fade
                indicators={false}
              >
                <Carousel.Item interval={3000}>
                  <a href="#">
                    <img
                      className="d-block w-100 carousel_img"
                      src="https://files.bo3.gg/uploads/news/51099/title_image/960x480-3c3285bf6594457a61646b88b40ed856.webp"
                    />
                  </a>
                  <Carousel.Caption className="carousel_caption_area">
                    <h3>Counter Strike 2</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <img
                    className="d-block w-100 carousel_img"
                    src="https://esports.as.com/2022/05/06/league-of-legends/League-Legends-contara-sistema-desafios_1571552855_971917_1440x810.jpg"
                  />
                  <Carousel.Caption className="carousel_caption_area">
                    <h3>League of Legends</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <img
                    className="d-block w-100 carousel_img"
                    src="https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg"
                  />
                  <Carousel.Caption className="carousel_caption_area">
                    <h3>Valorant</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </div>

          {/* Carousel Circular de Imagens começa aqui */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <button onClick={prevImage}>Prev</button>

            <div
              style={{
                display: "flex",
                overflow: "hidden", // Esconde as imagens extras
                width: "800px", // Ajusta conforme o número de imagens visíveis
                margin: "0 10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  transition: "transform 0.3s ease-in-out", // Transição suave
                }}
              >
                {getVisibleImages().map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    width="150px"
                    height="150px"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                    alt={`Imagem ${index}`}
                  />
                ))}
              </div>
            </div>

            <button onClick={nextImage}>Next</button>
          </div>
          {/* Carousel Circular de Imagens termina aqui */}

          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-around",
            }}
          >
            <Card style={{ width: "18rem" }} className="mb-2">
              <Card.Header>Ao Vivo</Card.Header>
              <Card.Body>
                <Card.Img src="https://notadogame.com/uploads/game/cover/250x/650e513cbec38.jpg" />
              </Card.Body>
            </Card>

            <Card style={{ width: "18rem" }} className="mb-2">
              <Card.Header>Transmissão anterior</Card.Header>
              <Card.Body>
                <Card.Img src="https://notadogame.com/uploads/game/cover/250x/650e513cbec38.jpg" />
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
}