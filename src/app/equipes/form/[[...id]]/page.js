'use client'

import Pagina from "@/app/components/Pagina"
import apiLocalidade from "@/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import { v4 } from 'uuid';


export default function Page({ params }) {

  const route = useRouter()

  const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || []
  const dados = aeroportos.find(item => item.id == params.id)
  const aeroporto = dados || { nome: '', sigla: '', ufs: '', cidade: '', pais: 'Brasil' }

  const [paises, setPaises] = useState([])
  const [ufs, setUfs] = useState([])
  const [cidades, setCidades] = useState([])
  const [camposBrasil, setCamposBrasil] = useState(false)

  useEffect(() => {
    apiLocalidade.get('paises').then(resultado => {
      setPaises(resultado.data)
    })

    apiLocalidade.get('estados?orderBy=nome').then(resultado => {
      setUfs(resultado.data)
    })
  })

  function salvar(dados) {
    if (aeroporto.id) {
      Object.assign(aeroporto, dados)
    } else {
      dados.id = v4()
      aeroportos.push(dados)
    }
    localStorage.setItem('aeroportos', JSON.stringify(aeroportos))
    return route.push("/aeroportos")
  }

  return (
    <Pagina titulo="Criar aeroporto">
      <Formik
        initialValues={aeroporto}
        onSubmit={values => salvar(values)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => {

          useEffect(() => {
            setCamposBrasil(values.pais == "Brasil")
          }, [values.pais])

          useEffect(() => {
            apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
              setCidades(resultado.data)
            })
          }, [values.ufs])

          return (
            <Form className="my-3">
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange('nome')} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="sigla">
                <Form.Label>Sigla</Form.Label>
                <Form.Control type="text"
                  name="sigla"
                  value={values.sigla}
                  onChange={handleChange('sigla')} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pais">
                <Form.Label>Pais</Form.Label>
                <Form.Select
                  name="pais"
                  value={values.pais}
                  onChange={handleChange('pais')}
                  aria-label="Default select example"
                >
                  <option value=''>Selecionar Pais</option>
                  {paises.map(item => (
                    <option key={item.nome} value={item.nome}>{item.nome}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {camposBrasil &&
                <>
                  <Form.Group className="mb-3" controlId="ufs">
                    <Form.Label>UF</Form.Label>
                    <Form.Select
                      name="ufs"
                      value={values.ufs}
                      onChange={handleChange('ufs')}
                      aria-label="Default select example"
                    >
                      <option value=''>Selecionar UF</option>
                      {ufs.map(item => (
                        <option key={item.nome} value={item.nome}>{item.nome} - {item.sigla}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="cidade">
                    <Form.Label>Cidade</Form.Label>
                      <Form.Select
                        name="cidade"
                        value={values.cidade}
                        onChange={handleChange('cidade')}
                        aria-label="Default select example"
                      >
                        <option value=''>Selecionar cidade</option>
                        {cidades.map(item => (
                          <option key={item.nome} value={item.nome}>{item.nome}</option>
                        ))}
                      </Form.Select>
                  </Form.Group>
                </>
              }

              <div className="text-center">
                <Button variant="success" onClick={handleSubmit}><FaCheck /> Salvar</Button>
                <Link href="/aeroportos" className="btn btn-danger mx-3"><FaTimes /> Cancelar</Link>
              </div>
            </Form>
          )
        }
        }
      </Formik>
    </Pagina>
  )
}
