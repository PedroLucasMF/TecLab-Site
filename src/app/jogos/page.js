'use client'

import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Header from '../components/Header/Header'
import './jogosStyle.css'
import Link from 'next/link'

export default function Page() {

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Jogos</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control className='mt-2 mb-5 w-75' type="text" placeholder="Pesquisar..." />
        </div>

        <Row>
          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://notadogame.com/uploads/game/cover/250x/650e513cbec38.jpg" />
                <Card.Body>
                  <Card.Title>Nome Jogo</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://notadogame.com/uploads/game/cover/250x/650e513cbec38.jpg" />
                <Card.Body>
                  <Card.Title>Nome Jogo</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://notadogame.com/uploads/game/cover/250x/650e513cbec38.jpg" />
                <Card.Body>
                  <Card.Title>Nome Jogo</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://notadogame.com/uploads/game/cover/250x/650e513cbec38.jpg" />
                <Card.Body>
                  <Card.Title>Nome Jogo</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
