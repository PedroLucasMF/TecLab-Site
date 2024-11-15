'use client';

import { Container, Table, Button } from "react-bootstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import apiESports from "@/services/apiESports"; // Atualize o caminho conforme necessário
import './genresStyle.css';
import { Rings } from "react-loader-spinner";
import Link from "next/link";

export default function Page() {

  const [genres, setGenres] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
    carregarGeneros();
  }, []);

  // Função para carregar gêneros da API
  const carregarGeneros = () => {
    setLoading(true);
    apiESports.get('/generos')
      .then(response => {
        setGenres(response.data.data); // Ajuste conforme a estrutura da resposta da sua API
      })
      .catch(error => {
        console.error("Erro ao carregar gêneros:", error);
      })
      .finally(() => setLoading(false));
  };

  // Função para adicionar um novo gênero
  const adicionarGenero = async () => {
    const { value: nome } = await Swal.fire({
      title: 'Adicionar Novo Gênero',
      input: 'text',
      inputPlaceholder: 'Digite o nome do gênero',
      showCancelButton: true,
      confirmButtonText: 'Adicionar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'O nome do gênero é obrigatório!';
        }
      },
    });

    if (nome) {
      try {
        await apiESports.post('/generos', { nome });
        Swal.fire('Sucesso!', 'Gênero adicionado com sucesso.', 'success');
        carregarGeneros();
      } catch (error) {
        console.error("Erro ao adicionar gênero:", error);
        Swal.fire('Erro!', 'Ocorreu um erro ao adicionar o gênero.', 'error');
      }
    }
  };

  //Função para editar o genero
  const editarGenero = async (id, nomeAtual) => {
    const { value: novoNome } = await Swal.fire({
      title: 'Editar Gênero',
      input: 'text',
      inputPlaceholder: 'Digite o novo nome do gênero',
      inputValue: nomeAtual,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'O nome do gênero é obrigatório!';
        }
      },
    });

    if (novoNome) {
      try {
        await apiESports.put(`/generos/${id}`, { nome: novoNome });
        Swal.fire('Sucesso!', 'Gênero atualizado com sucesso.', 'success');
        carregarGeneros();
      } catch (error) {
        console.error("Erro ao editar gênero:", error);
        Swal.fire('Erro!', 'Ocorreu um erro ao editar o gênero.', 'error');
      }
    }
  };

  // Função para excluir um gênero
  const excluirGenero = async (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiESports.delete(`/generos/${id}`);
          Swal.fire('Excluído!', 'O gênero foi excluído com sucesso.', 'success');
          carregarGeneros();
        } catch (error) {
          console.error("Erro ao excluir gênero:", error);
          Swal.fire('Erro!', 'Ocorreu um erro ao excluir o gênero.', 'error');
        }
      }
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Rings
          height="100"
          width="100"
          color="green"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <>
      {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
        <>
          <Header />
          <Container>
            <div className='d-flex justify-content-between align-items-center mt-5'>
              <h1>Gerenciamento de Gêneros</h1>
              <Button variant="success" onClick={adicionarGenero}>
                Adicionar Gênero
              </Button>
            </div>

            <Table striped bordered hover className="my-5">
              <thead>
                <tr>
                  <th>Ações</th>
                  <th>Nome</th>
                </tr>
              </thead>
              <tbody>
                {genres.map(genre => (
                  <tr key={genre.id}>
                    <td>
                      <FaRegEdit
                        title="Editar"
                        className="text-primary me-3"
                        onClick={() => editarGenero(genre.id)}
                      />

                      <MdDelete
                        title="Excluir"
                        className="text-danger"
                        onClick={() => excluirGenero(genre.id)}
                      />
                    </td>
                    <td>{genre.nome}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <Footer />
        </>
      ) : (
        <h1>Acesso Negado</h1>
      )}
    </>
  );
}
