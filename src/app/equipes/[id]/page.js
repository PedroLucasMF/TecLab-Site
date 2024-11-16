'use client'

import { Card, Col, Container, Image, Row, Form, Button } from "react-bootstrap";
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import Swal from "sweetalert2";

export default function Page({ params }) {
  const [equipe, setEquipe] = useState({});
  const [jogadores, setJogadores] = useState([]); // Lista de jogadores disponíveis
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null); // Jogador a ser adicionado
  const [equipe_jogador, setEquipe_jogador] = useState([])

  useEffect(() => {
    // Carregar os dados da equipe
    apiESports.get(`/equipes/${params.id}`).then(resultado => {
      setEquipe(resultado.data);
    });

    // Carregar a lista de jogadores disponíveis
    apiESports.get(`/jogadores?perPage=100`).then(resultado => {
      setJogadores(resultado.data.data);
    });

    apiESports.get(`/equipe_jogadores?perPage=100`).then((resultado) => {
      setEquipe_jogador(resultado.data.data)
    })
  }, [params.id]);

  // Função para adicionar o jogador à equipe
  // Função para adicionar o jogador à equipe
  const adicionarJogador = () => {
    if (jogadorSelecionado) {
      apiESports.post('/equipe_jogadores', {
        equipeId: params.id,
        jogadoreId: jogadorSelecionado,
      })
        .then((res) => {
          const jogador = jogadores.find((j) => j.id === jogadorSelecionado);

          // Atualiza a lista de jogadores na equipe
          setEquipe((prev) => ({
            ...prev,
            jogadores: [...(prev.jogadores || []), jogador],
          }));

          // Atualiza equipe_jogador com o novo registro
          setEquipe_jogador((prev) => [
            ...prev,
            { id: res.data.id, equipeId: params.id, jogadoreId: jogadorSelecionado },
          ]);

          Swal.fire('Sucesso', 'Jogador adicionado com sucesso!', 'success');
        })
        .catch((err) => {
          console.error(err);
          Swal.fire('Erro', 'Erro ao adicionar o jogador!', 'error');
        });
    } else {
      Swal.fire('Atenção', 'Selecione um jogador!', 'warning');
    }
  };


  // Função para remover jogador da equipe
  const removerJogador = async (idJogador) => {
    try {
      // Encontrar o registro que associa o jogador à equipe
      const procuraRegistro = equipe_jogador.find(
        (item) => item.equipeId == params.id && item.jogadoreId == idJogador
      );

      if (!procuraRegistro) {
        Swal.fire('Erro', 'Registro não encontrado!', 'error');
        return;
      }

      const id = procuraRegistro.id;

      // Realizar a exclusão
      await apiESports.delete(`/equipe_jogadores/${id}`);

      // Atualizar a lista de jogadores da equipe
      setEquipe((prev) => ({
        ...prev,
        jogadores: prev.jogadores.filter((jogador) => jogador.id !== idJogador),
      }));
      Swal.fire('Sucesso', 'Jogador removido com sucesso!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Erro', 'Não foi possível remover o jogador.', 'error');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="my-5 bg-body p-4 rounded-2">
          <Row>
            <Col md={4}>
              <Image src={equipe.logo} width={350} alt={equipe.nome} title={equipe.nome} />
            </Col>

            <Col md={8} className="text-black">
              <>
                <h2>{equipe.nome}</h2>
                <h3>{equipe.regiao}</h3>
              </>
            </Col>
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Integrantes</h2>
            {equipe.jogadores && <>
              {equipe.jogadores.map(item => (
                <Col md={2} key={item.id}>
                  <Card>
                    <Card.Img variant="top" src={item.foto} />
                    <Card.Body>
                      <Card.Title>{item.nick}</Card.Title>
                    </Card.Body>
                  </Card>
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => removerJogador(item.id)}
                  >
                    Remover
                  </Button>
                </Col>
              ))}
            </>}
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Adicionar Novo Integrante</h2>
            <Form className="d-flex justify-content-center align-items-center">
              <Form.Select
                onChange={(e) => setJogadorSelecionado(Number(e.target.value))}
                className="me-2"
              >
                <option value="">Selecione um jogador</option>
                {jogadores.map(jogador => (
                  <option key={jogador.id} value={jogador.id}>
                    {jogador.nick}
                  </option>
                ))}
              </Form.Select>
              <Button onClick={adicionarJogador} variant="primary">
                Adicionar
              </Button>
            </Form>
          </Row>

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Torneios</h2>
            {equipe.torneios && <>
              {equipe.torneios.map(item => (
                <p key={item.id}>
                  {item.nome}
                </p>
              ))}
            </>}
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
}
