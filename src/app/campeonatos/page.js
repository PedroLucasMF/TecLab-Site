'use client';

import { Card, Carousel, Col, Container, Form, Image, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import apiESports from "@/services/apiESports";
import './campeonatosStyle.css';
import Link from "next/link";
import Swal from "sweetalert2";
import { FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function Page() {

  const [torneios, setTorneios] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [search, setSearch] = useState(""); // Estado para a barra de busca
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    verificarAdmin();
    carregarDados();
  }, []);

  // Verifica se o usuário é administrador
  const verificarAdmin = () => {
    const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
    if (usuario && usuario.email === 'admin@admin.com') {
      setIsAdmin(true);
    }
  };

  // Carrega os dados dos torneios e equipes
  const carregarDados = () => {
    apiESports.get(`/torneios`).then(resultado => {
      setTorneios(resultado.data.data);
    });

    apiESports.get(`/equipes`).then(resultado => {
      setEquipes(resultado.data.data);
    });
  };

  // Exclui um campeonato com confirmação
  const excluirTorneio = async (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiESports.delete(`/torneios/${id}`);
          carregarDados();
          Swal.fire('Excluído!', 'O campeonato foi excluído com sucesso.', 'success');
        } catch (error) {
          console.error('Erro ao excluir torneio:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao tentar excluir o campeonato.', 'error');
        }
      }
    });
  };

  // Função para dividir o array de equipes em subarrays de 4
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const groupedTeams = chunkArray(equipes, 4);

  // Filtrar campeonatos baseados no texto de busca
  const filteredTorneios = torneios.filter(torneio =>
    torneio.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container>
        {/* Carousel de Campeonatos */}
        <h1 className="d-flex justify-content-center my-4">Campeonatos Agora</h1>
        <div className="d-flex justify-content-center">
          <Carousel className="w-75 carousel_background" fade indicators={false}>
            {torneios.map(item => (
              <Carousel.Item key={item.id} interval={3000}>
                <a href="#">
                  <Image className="d-block w-100 carousel_img" src={item.logoCamp} alt={item.nome} />
                </a>
                <Carousel.Caption className="carousel_caption_area">
                  <h3>{item.nome}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Carousel de Equipes */}
        <h1 className="d-flex justify-content-center my-4">Equipes Populares</h1>
        <div className="d-flex justify-content-center">
          <Carousel className="w-75" indicators={false}>
            {groupedTeams.map((group, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4 p-4">
                  {group.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={3}>
                      <Card className="text-center">
                        <Link href={`/equipes/${item.id}`}>
                          <Card.Img
                            variant="top"
                            src={item.logo}
                            alt={item.nome}
                            className="team-logo mx-auto"
                          />
                          <Card.Body>
                            <Card.Title className="nome-equipe text-black">{item.nome}</Card.Title>
                          </Card.Body>
                        </Link>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Barra de Busca e Cards dos Campeonatos */}
        <h1 className="d-flex justify-content-center my-4">Pesquisar Campeonatos</h1>
        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Digite o nome do campeonato..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Form>
        {isAdmin && (
          <Link className='btn btn-success mb-3' href={`/campeonatos/form`}><FaPlus /> Adicionar</Link>
        )}
        <Row className="g-4">
          {filteredTorneios.map(torneio => (
            <Col key={torneio.id} xs={12} sm={6} md={4} lg={3}>
              <Link href={`/campeonatos/${torneio.id}`}>
                <Card className="text-center torneio-card">
                  <Card.Img variant="top" src={torneio.logoCamp} alt={torneio.nome} className="torneio-card-img" />
                  <Card.Body>
                    <Card.Title className="text-black">{torneio.nome}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>

              {isAdmin && (
                <div className='d-flex gap-2 mt-2'>
                  <Link className='btn btn-primary w-50' href={`/campeonatos/form/${torneio.id}`}>Editar <FaRegEdit /></Link>
                  <Button variant="danger" className='w-50' size="sm" onClick={() => excluirTorneio(torneio.id)}>Excluir <FaRegTrashAlt /></Button>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
