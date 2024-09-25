'use client'

import { Carousel, Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import './mainStyle.css'
import Footer from "./components/Footer/Footer";

export default function Home() {
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
    </Container>
    <Footer />
  </>
  );
}
