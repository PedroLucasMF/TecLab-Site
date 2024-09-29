'use client'

import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Header from '../components/Header/Header'
import './playersStyle.css'
import Link from 'next/link'

export default function Page() {

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Equipes</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control className='mt-2 mb-5 w-75' type="text" placeholder="Pesquisar..." />
        </div>

        <Row>
          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://img-cdn.hltv.org/playerbodyshot/EQuPdPSxo2xmXDwwoVRx4j.png?ixlib=java-2.1.0&w=400&s=a22c84e43ee55c164fbb59fbb35366a6" />
                <Card.Body>
                  <Card.Title>Nome Player</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://img-cdn.hltv.org/playerbodyshot/EQuPdPSxo2xmXDwwoVRx4j.png?ixlib=java-2.1.0&w=400&s=a22c84e43ee55c164fbb59fbb35366a6" />
                <Card.Body>
                  <Card.Title>Nome Player</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://img-cdn.hltv.org/playerbodyshot/EQuPdPSxo2xmXDwwoVRx4j.png?ixlib=java-2.1.0&w=400&s=a22c84e43ee55c164fbb59fbb35366a6" />
                <Card.Body>
                  <Card.Title>Nome Player</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://img-cdn.hltv.org/playerbodyshot/EQuPdPSxo2xmXDwwoVRx4j.png?ixlib=java-2.1.0&w=400&s=a22c84e43ee55c164fbb59fbb35366a6" />
                <Card.Body>
                  <Card.Title>Nome Player</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
