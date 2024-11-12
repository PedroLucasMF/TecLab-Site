'use client'

import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Header from '../components/Header/Header'
import './jogosStyle.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import apiESports from '@/services/apiESports'
import Footer from '../components/Footer/Footer'

export default function Page() {

  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    apiESports.get(`/jogos`).then(resultado => {
      setJogos(resultado.data.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Jogos</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control className='mt-2 mb-5 w-75' type="text" placeholder="Pesquisar..." />
        </div>

        <Row>
          {jogos.map(item => (
            <Col md={3} key={item.id} className='my-3'>
              <Link href={`/jogos/${item.id}`}>
                <Card className='game-card'>
                  <Card.Img variant="top" src={item.cover} className='game-card-img p-2' />
                  <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  )
}
