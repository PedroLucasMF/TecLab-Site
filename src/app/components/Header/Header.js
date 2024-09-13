'use client'

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../public/logo_site.png'
import Image from "next/image";
import './style.css'
import Link from "next/link";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="header_background">
      <Container>
        <Navbar.Brand className="pe-5"><Link href="/"><Image width={50} src={logo} /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav><Link className="nav-link-custom me-4" href="/campeonatos">Campeonatos</Link></Nav>
            <Nav><Link className="nav-link-custom me-4" href="/jogos">Jogos</Link></Nav>
            <Nav><Link className="nav-link-custom me-4" href="/equipes">Equipes</Link></Nav>
          </Nav>
          <Nav>
            <Nav><Link className="nav-link-custom" href="/login">Login</Link></Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
