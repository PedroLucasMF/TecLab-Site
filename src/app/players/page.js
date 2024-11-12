'use client'

import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Header from '../components/Header/Header'
import './playersStyle.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import apiESports from '@/services/apiESports'

export default function Page() {

  const [jogadores, setJogadores] = useState([])

  useEffect(() => {
    apiESports.get('jogadores?perPage=100').then(resultado => {
      setJogadores(resultado.data.data)
    })

  }, [])

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Players</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control className='mt-2 mb-5 w-75' type="text" placeholder="Pesquisar..." />
        </div>

        <Row>
          {jogadores.map(item => (
            <Col md={3} className='my-3'>
              <Link href={`/players/${item.id}`}>
                <Card className='player-card'>
                  <Card.Img variant="top" src={item.foto} className='player-card-img'/>
                  <Card.Body>
                    <Card.Title>{item.nick}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
