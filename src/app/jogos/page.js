'use client';

import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import Header from '../components/Header/Header';
import './jogosStyle.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import apiESports from '@/services/apiESports';
import Footer from '../components/Footer/Footer';
import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Page() {
  const [jogos, setJogos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    verificarAdmin();
    carregarJogos();
  }, []);

  // Verifica se o usuário é administrador
  const verificarAdmin = () => {
    const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
    if (usuario && usuario.email === 'admin@admin.com') {
      setIsAdmin(true);
    }
  };

  // Função para carregar os jogos da API
  const carregarJogos = () => {
    apiESports.get('/jogos')
      .then(resultado => {
        setJogos(resultado.data.data);
      })
      .catch(error => {
        console.error('Erro ao carregar jogos:', error);
      });
  };

  // Função para excluir um jogo com confirmação usando SweetAlert2
  const excluirJogo = async (id) => {
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
          await apiESports.delete(`/jogos/${id}`);
          carregarJogos(); // Recarrega a lista após exclusão
          Swal.fire('Excluído!', 'O jogo foi excluído com sucesso.', 'success');
        } catch (error) {
          console.error('Erro ao excluir jogo:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao tentar excluir o jogo.', 'error');
        }
      }
    });
  };

  // Função para atualizar o termo de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtra jogos com base no termo de pesquisa
  const jogosFiltrados = jogos.filter(jogo =>
    jogo.nome.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Jogos</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control
            className='mt-2 mb-5 w-75'
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {isAdmin && (
          <Link className='btn btn-success mb-3' href={`/jogos/form`}><FaPlus /> Adicionar</Link>
        )}

        <Row>
          {jogosFiltrados.map(item => (
            <Col md={3} key={item.id} className='my-3'>
              <Link href={`/jogos/${item.id}`}>
                <Card className='game-card'>
                  <Card.Img variant="top" src={item.cover} className='game-card-img p-2' />
                  <Card.Body>
                    <Card.Title className='text-black'>{item.nome}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>

              {isAdmin && (
                <div className='d-flex gap-2 mt-2'>
                  <Link className='btn btn-primary w-50' href={`/jogos/form/${item.id}`}>Editar <FaRegEdit /></Link>
                  <Button variant="danger" className='w-50' size="sm" onClick={() => excluirJogo(item.id)}>Excluir <FaRegTrashAlt /></Button>
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
