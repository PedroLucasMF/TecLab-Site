'use client'

import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import Header from "./components/Header/Header";
import './mainStyle.css'
import Footer from "./components/Footer/Footer";
import { useState } from "react";

export default function Home() {

  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      nome: 'Counter-Strike 2',
      descricao: 'Há mais de duas décadas, o Counter-Strike oferece uma experiência competitiva de elite moldada por milhões de jogadores mundialmente. Agora, o próximo capítulo da história do CS vai começar. Isso é Counter-Strike 2.',
      rating: 4.5,
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjwKekkkpqAo8Q6Yus1wkqgB_Ynb8YU1saKQ&s'
    },
    {
      nome: 'Rainbow Six Siege',
      descricao: 'Tom Clancys Rainbow Six® Siege é um jogo de tiro tático em equipes, realista e de elite, no qual planejamento e execução superiores triunfam.',
      rating: 4.5,
      foto: 'https://s2-ge.glbimg.com/Mn4MpbfOftUzZYusjMjY6ucisp4=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/b/d/MsAo0RQq25hzLuK95lew/r6-thumb.jpg',
    },
    {
      nome: 'Valorant',
      rating: 4.5,
      descricao: 'Valorant é um jogo eletrônico multijogador gratuito para jogar de tiro em primeira pessoa desenvolvido e publicado pela Riot Games',
      foto: 'https://s2-techtudo.glbimg.com/M0ll8r3w3WsiRLLroy5xJaK4A5c=/0x0:1656x915/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/j/3cZcm6Qf6TxFIAW0nMNg/como-baixar-valorant-de-graca-the-squad.jpg'
    },
    {
      nome: 'Apex Legends',
      rating: 4.5,
      descricao: 'Apex Legends é um jogo eletrônico free-to-play do gênero battle royale desenvolvido pela Respawn Entertainment e publicado pela Electronic Arts.',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxwApIpvyE9ncizP3Tv4-Ja5XhndUxc6SGnA&s'
    },
    {
      nome: 'League of Legends',
      rating: 4.5,
      descricao: 'League of Legends é um jogo eletrônico do gênero multiplayer online battle arena desenvolvido e publicado pela Riot Games. Foi lançado em outubro de 2009 para Microsoft Windows e em março de 2013 para macOS.',
      foto: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/8/1/ksfga6rlx2ugfhjd9vnk/league-of-legends'
    },
    {
      nome: 'EA FC25',
      rating: 4.5,
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcHNRZmck-6MFdCrUbR3htsTCMHoRsbdQVoA&s'
    }
  ]

  const renderGameInfo = (game) => (
    <Card className="text-light bg-dark p-3">
      <Card.Body>
        <Card.Title className="text-success">{game.nome}</Card.Title>
        <div>
          <span>Avaliações: </span>
          <span>{'★'.repeat(Math.floor(game.rating))}</span>
        </div>
        <Card.Img variant="top" src={game.foto} className="my-3" style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Text>{game.descricao}</Card.Text>
      </Card.Body>
    </Card>
  );

  return (<>
    <Header />
    <Container>
      <h1 className="d-flex justify-content-center my-4">Populares no Momento</h1>
      <div className="d-flex justify-content-center">
        <Carousel className="w-75 carousel_background" fade indicators={false}>
          <Carousel.Item interval={3000}>
            <a href="#">
              <img className="d-block w-100 carousel_img" src="https://files.bo3.gg/uploads/news/51099/title_image/960x480-3c3285bf6594457a61646b88b40ed856.webp" />
            </a>
            <Carousel.Caption className="carousel_caption_area">
              <h3>Counter Strike 2</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img className="d-block w-100 carousel_img" src="https://esports.as.com/2022/05/06/league-of-legends/League-Legends-contara-sistema-desafios_1571552855_971917_1440x810.jpg" />
            <Carousel.Caption className="carousel_caption_area">
              <h3>League of Legends</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img className="d-block w-100 carousel_img" src="https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg" />
            <Carousel.Caption className="carousel_caption_area">
              <h3>Valorant</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <h2 className="d-flex justify-content-center my-5">Jogos Populares</h2>

      <Row className="g-4">
        <Col md={8}>
          <Row xs={1} md={3} className="g-4">
            {games.map((game, index) => (
              <Col key={index}>
                <Card
                  onMouseEnter={() => setSelectedGame(game)}
                  style={{ height: '350px', width: '250px' }}
                >
                  <Card.Img variant="top" src={game.foto} style={{ height: '350px', objectFit: 'cover' }} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          {selectedGame ? renderGameInfo(selectedGame) : <p>Passe o mouse sobre um jogo para ver os detalhes.</p>}
        </Col>
      </Row>

    </Container>
    <Footer />
  </>
  );
}
