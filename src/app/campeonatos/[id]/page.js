'use client'

import { Card, Col, Container, Image, Row, Form, Button } from "react-bootstrap";
import apiESports from "@/services/apiESports";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import './Style.css'
import Link from "next/link";

export default function Page({ params }) {
  const [torneio, setTorneio] = useState({});
  const [torneioPartidas, setTorneioPartidas] = useState([]);
  const [partidaEquipes, setPartidaEquipes] = useState([]);
  const [partidaEquipesFiltradas, setPartidaEquipesFiltradas] = useState([]);
  const [equipesDisponiveis, setEquipesDisponiveis] = useState([]);
  const [equipeSelecionada, setEquipeSelecionada] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    // Carregar dados do torneio e suas partidas
    apiESports.get(`/torneios/${params.id}`).then((resultado) => {
      setTorneio(resultado.data);
      setTorneioPartidas(resultado.data.partidas);
    });

    // Carregar dados das equipes relacionadas às partidas
    apiESports.get(`/partida_equipes?perPage=100`).then((resultado) => {
      setPartidaEquipes(resultado.data.data);
    });

    // Carregar lista de equipes disponíveis
    apiESports.get(`/equipes?perPage=100`).then((resultado) => {
      setEquipesDisponiveis(resultado.data.data);
    });

    verificarAdmin();

  }, [params.id]);

  const verificarAdmin = () => {
    const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
    if (usuario && usuario.email === 'admin@admin.com') {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    // Filtrar as partidas do torneio
    if (torneioPartidas.length > 0 && partidaEquipes.length > 0) {
      const idsPartidas = torneioPartidas.map((partida) => partida.id);
      const filtradas = partidaEquipes.filter((item) =>
        idsPartidas.includes(item.partidaId)
      );
      setPartidaEquipesFiltradas(filtradas);
    }
  }, [torneioPartidas, partidaEquipes]);

  // Função para encontrar as equipes de uma partida
  const getEquipesDaPartida = (partidaId) => {
    const equipesNaPartida = partidaEquipesFiltradas.filter(
      (item) => item.partidaId === partidaId
    );
    return equipesNaPartida.map((item) =>
      torneio.equipes.find((equipe) => equipe.id === item.equipeId)
    );
  };

  // Função para adicionar equipe ao torneio
  const adicionarEquipeAoTorneio = () => {
    if (!equipeSelecionada) {
      alert("Selecione uma equipe!");
      return;
    }

    apiESports.post(`/torneio_equipes`, {
      torneioId: params.id,
      equipeId: equipeSelecionada,
    })
      .then(() => {
        alert("Equipe adicionada com sucesso!");
        setTorneio((prev) => ({
          ...prev,
          equipes: [...(prev.equipes || []), equipesDisponiveis.find(e => e.id === equipeSelecionada)],
        }));
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao adicionar a equipe!");
      });
  };

  //Função para remover equipe
  const removerEquipe = async (idEquipe) => {
    try {
      // Encontrar o registro que associa a equipe ao torneio
      const procuraRegistro = torneio.equipes.find(
        (item) => item.id === idEquipe
      );

      if (!procuraRegistro) {
        alert("Erro: Registro não encontrado!");
        return;
      }

      const id = procuraRegistro.id;

      // Realizar a exclusão
      await apiESports.delete(`/torneio_equipes/${id}`);

      // Atualizar a lista de equipes do torneio
      setTorneio((prev) => ({
        ...prev,
        equipes: prev.equipes.filter((equipe) => equipe.id !== idEquipe),
      }));

      alert("Equipe removida com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao remover a equipe!");
    }
  };

  //Adiciona uma nova partida
  const adicionarPartida = async (equipe1Id, equipe2Id, dataPartida) => {
    try {
      // Criar a nova partida
      const novaPartida = await apiESports.post('/partidas', {
        dataPartida,
        resultado: null, // Inicialmente sem resultado
      });

      const partidaId = novaPartida.data.id;

      // Associar as equipes à partida
      await Promise.all([
        apiESports.post('/partida_equipes', { partidaId, equipeId: equipe1Id }),
        apiESports.post('/partida_equipes', { partidaId, equipeId: equipe2Id }),
      ]);

      // Associar a partida ao torneio
      await apiESports.post('/torneio_partidas', {
        torneioId: torneio.id,
        partidaId,
      });

      // Atualizar o estado das partidas no torneio
      setTorneioPartidas((prev) => [...prev, { id: partidaId, dataPartida }]);

      alert('Partida adicionada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar a partida!');
    }
  };

  //Remover partida
  const removerPartida = async (idPartida) => {
    try {
      if (!window.confirm("Tem certeza de que deseja remover esta partida?")) {
        return;
      }

      // Encontrar registros relacionados no estado local
      const registrosPartidaEquipes = partidaEquipes.filter(
        (item) => item.partidaId === idPartida
      );

      const registrosTorneioPartidas = torneioPartidas.find(
        (item) => item.id === idPartida
      );

      // Validar se os registros foram encontrados
      if (!registrosPartidaEquipes.length || !registrosTorneioPartidas) {
        alert("Erro: Não foi possível encontrar todos os registros relacionados!");
        return;
      }

      // Fazer múltiplas requisições para remover associações
      const promises = registrosPartidaEquipes.map((registro) =>
        apiESports.delete(`/partida_equipes/${registro.id}`)
      );

      // Remover associação entre torneio e partida
      promises.push(apiESports.delete(`/torneio_partidas/${registrosTorneioPartidas.id}`));

      // Executar as requisições
      await Promise.all(promises);

      // Excluir a partida
      await apiESports.delete(`/partidas/${idPartida}`);

      // Atualizar estado local
      setTorneioPartidas((prev) =>
        prev.filter((partida) => partida.id !== idPartida)
      );
      setPartidaEquipes((prev) =>
        prev.filter((item) => item.partidaId !== idPartida)
      );

      alert("Partida removida com sucesso!");
    } catch (error) {
      console.error(error);
      alert(`Erro ao remover a partida: ${error.response?.data?.message || error.message}`);
    }
  };


  return (
    <>
      <Header />
      <Container>
        <div className="my-5 bg-body p-4 rounded-2">
          <Row>
            <Col md={4}>
              <Image
                src={torneio.logoCamp}
                width={350}
                alt={torneio.nome}
                title={torneio.nome}
              />
            </Col>
            <Col md={8} className="text-black">
              <h2>{torneio.nome}</h2>
              <h6>Início: {torneio.dataInicio}</h6>
              <h6>Fim: {torneio.dataFim}</h6>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center gap-3 my-5 text-black">
            <h2 className="d-flex justify-content-center">Equipes Participantes</h2>
            {torneio.equipes && (
              <>
                {torneio.equipes.map((item) => (
                  <Col md={2} key={item.id}>
                    <Link className="text-decoration-none" href={`/equipes/${item.id}`}>
                      <Card className="equipe-card">
                        <Card.Img className="equipe-card-img" variant="top" src={item.logo} />
                        <Card.Body>
                          <Card.Title>{item.nome}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                    {isAdmin &&
                      <Button
                        variant="danger"
                        onClick={() => removerEquipe(item.id)}
                      >
                        Remover
                      </Button>
                    }
                  </Col>
                ))}
              </>
            )}
          </Row>

          {isAdmin &&
            <Row className="my-5 text-black">
              <h2 className="d-flex justify-content-center">Adicionar Equipe</h2>
              <Form className="d-flex justify-content-center align-items-center">
                <Form.Select
                  onChange={(e) => setEquipeSelecionada(Number(e.target.value))}
                  className="me-2"
                >
                  <option value="">Selecione uma equipe</option>
                  {equipesDisponiveis.map((equipe) => (
                    <option key={equipe.id} value={equipe.id}>
                      {equipe.nome}
                    </option>
                  ))}
                </Form.Select>
                <Button onClick={adicionarEquipeAoTorneio} variant="primary">
                  Adicionar
                </Button>
              </Form>
            </Row>
          }

          <Row className="my-5 text-black">
            <h2 className="d-flex justify-content-center">Partidas</h2>
            {torneioPartidas.map((partida) => {
              const equipes = getEquipesDaPartida(partida.id);
              return (
                <Col md={6} key={partida.id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>Partida em {partida.dataPartida}</Card.Title>
                      {equipes.length === 2 ? (
                        <p>
                          <strong>{equipes[0]?.nome || "Equipe 1"}</strong> vs.{" "}
                          <strong>{equipes[1]?.nome || "Equipe 2"}</strong>
                        </p>
                      ) : (
                        <p>Confronto ainda não definido</p>
                      )}
                    </Card.Body>
                    {isAdmin &&
                      <Button
                        variant="danger"
                        onClick={() => removerPartida(partida.id)}
                      >
                        Remover
                      </Button>
                    }
                  </Card>
                </Col>
              );
            })}
          </Row>

          {isAdmin &&
            <Row className="my-5 text-black">
              <h2 className="d-flex justify-content-center">Adicionar Nova Partida</h2>
              <Col md={6} className="offset-md-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const equipe1Id = formData.get('equipe1');
                    const equipe2Id = formData.get('equipe2');
                    const dataPartida = formData.get('dataPartida');

                    if (equipe1Id === equipe2Id) {
                      alert('As equipes não podem ser iguais!');
                      return;
                    }

                    adicionarPartida(equipe1Id, equipe2Id, dataPartida);
                  }}
                >
                  {torneio.equipes &&
                    <>
                      <div className="mb-3">
                        <label className="form-label">Equipe 1</label>
                        <select name="equipe1" className="form-select" required>
                          <option value="">Selecione uma equipe</option>
                          {torneio.equipes.map((equipe) => (
                            <option key={equipe.id} value={equipe.id}>
                              {equipe.nome}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Equipe 2</label>
                        <select name="equipe2" className="form-select" required>
                          <option value="">Selecione uma equipe</option>
                          {torneio.equipes.map((equipe) => (
                            <option key={equipe.id} value={equipe.id}>
                              {equipe.nome}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Data da Partida</label>
                        <input
                          type="date"
                          name="dataPartida"
                          className="form-control"
                          required
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Adicionar Partida
                      </button>
                    </>
                  }
                </form>
              </Col>
            </Row>
          }
        </div>
      </Container>
      <Footer />
    </>
  );
}
