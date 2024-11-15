'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../components/Header/Header';
import './equipesStyle.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import apiESports from '@/services/apiESports';
import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Page() {
  const [equipes, setEquipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    verificarAdmin();
    carregarEquipes();
  }, []);

  // Verifica se o usuário é administrador
  const verificarAdmin = () => {
    const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
    if (usuario && usuario.email === 'admin@admin.com') {
      setIsAdmin(true);
    }
  };

  // Carrega as equipes da API
  const carregarEquipes = () => {
    apiESports.get('/equipes')
      .then(resultado => {
        setEquipes(resultado.data.data);
      })
      .catch(error => {
        console.error('Erro ao carregar equipes:', error);
      });
  };

  // Exclui uma equipe com confirmação do SweetAlert2
  const excluirEquipe = async (id) => {
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
          await apiESports.delete(`/equipes/${id}`);
          carregarEquipes();
          Swal.fire('Excluído!', 'A equipe foi excluída com sucesso.', 'success');
        } catch (error) {
          console.error('Erro ao excluir equipe:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao tentar excluir a equipe.', 'error');
        }
      }
    });
  };

  // Atualiza o termo de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtra equipes com base no termo de pesquisa
  const equipesFiltradas = equipes.filter(equipe =>
    equipe.nome.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center my-4">Equipes</h1>

        <div className='d-flex justify-content-center'>
          <Form.Control
            className='mt-2 mb-5 w-75'
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange} // Filtra conforme o usuário digita
          />
        </div>

        {isAdmin && (
          <Link className='btn btn-success mb-3' href={`/equipes/form`}><FaPlus /> Adicionar</Link>
        )}

        <Row>
          {equipesFiltradas.map(item => ( // Usa as equipes filtradas
            <Col className='my-3' md={3} key={item.id}>
              <Link href={`/equipes/${item.id}`}>
                <Card className='equipe-card'>
                  <Card.Img variant="top" src={item.logo} className='equipe-card-img p-4' />
                  <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>

              {isAdmin && (
                <div className='d-flex gap-2 mt-2'>
                  <Link className='btn btn-primary w-50' href={`/equipes/form/${item.id}`}>Editar <FaRegEdit /></Link>
                  <Button variant="danger" className='w-50' size="sm" onClick={() => excluirEquipe(item.id)}>Excluir <FaRegTrashAlt /></Button>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
