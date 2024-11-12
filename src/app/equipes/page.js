'use client'

import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Header from '../components/Header/Header'
import './equipesStyle.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import apiESports from '@/services/apiESports'

export default function Page() {

  const [equipes, setEquipes] = useState([])

  useEffect(() => {
    apiESports.get('equipes').then(resultado => {
      setEquipes(resultado.data.data)
    })

  }, [])

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Equipes</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control className='mt-2 mb-5 w-75' type="text" placeholder="Pesquisar..." />
        </div>

        <Row>
          {equipes.map(item => (
            <Col className='my-3' md={3}>
              <Link href={`/equipes/${item.id}`}>
                <Card className='equipe-card'>
                  <Card.Img variant="top" src={item.logo} className='equipe-card-img p-4' />
                  <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
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
