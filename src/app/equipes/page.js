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

  console.log(equipes)
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
                <Card.Img variant="top" src="https://api.draft5.gg/teams/6/logo" />
                <Card.Body>
                  <Card.Title>Nome Time</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://api.draft5.gg/teams/6/logo" />
                <Card.Body>
                  <Card.Title>Nome Time</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://api.draft5.gg/teams/6/logo" />
                <Card.Body>
                  <Card.Title>Nome Time</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={3}>
            <Link href="/equipes/id">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://api.draft5.gg/teams/6/logo" />
                <Card.Body>
                  <Card.Title>Nome Time</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
