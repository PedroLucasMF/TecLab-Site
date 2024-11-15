'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../components/Header/Header';
import './playersStyle.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import apiESports from '@/services/apiESports';
import Swal from 'sweetalert2';
import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function Page() {

  const [jogadores, setJogadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    verificarAdmin();
    carregarJogadores();
  }, []);

  // Verifica se o usuário é administrador
  const verificarAdmin = () => {
    const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
    if (usuario && usuario.email === 'admin@admin.com') {
      setIsAdmin(true);
    }
  };

  // Carrega os jogadores da API
  const carregarJogadores = () => {
    apiESports.get('/jogadores?perPage=100')
      .then(resultado => {
        setJogadores(resultado.data.data);
      })
      .catch(error => {
        console.error('Erro ao carregar jogadores:', error);
      });
  };

  // Exclui um jogador com confirmação do SweetAlert2
  const excluirJogador = async (id) => {
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
          await apiESports.delete(`/jogadores/${id}`);
          carregarJogadores();
          Swal.fire('Excluído!', 'O jogador foi excluído com sucesso.', 'success');
        } catch (error) {
          console.error('Erro ao excluir jogador:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao tentar excluir o jogador.', 'error');
        }
      }
    });
  };

  // Atualiza o termo de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtra os jogadores com base no termo de pesquisa
  const jogadoresFiltrados = jogadores.filter(jogador =>
    jogador.nick.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Players</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control
            className='mt-2 mb-5 w-75'
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange} // Atualiza a pesquisa
          />
        </div>

        {isAdmin && (
          <Link className='btn btn-success mb-3' href={`/players/form`}><FaPlus /> Adicionar</Link>
        )}

        <Row>
          {jogadoresFiltrados.map(item => ( // Exibe os jogadores filtrados
            <Col md={3} className='my-3' key={item.id}>
              <Link href={`/players/${item.id}`}>
                <Card className='player-card'>
                  <Card.Img variant="top" src={item.foto} className='player-card-img' />
                  <Card.Body>
                    <Card.Title>{item.nick}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>

              {isAdmin && (
                <div className='d-flex gap-2 mt-2'>
                  <Link className='btn btn-primary w-50' href={`/players/form/${item.id}`}>Editar <FaRegEdit /></Link>
                  <Button variant="danger" className='w-50' size="sm" onClick={() => excluirJogador(item.id)}>Excluir <FaRegTrashAlt /></Button>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
