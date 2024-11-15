'use client'

import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../public/logo_site.png'
import login_image from '../../public/login_image.png'
import Image from "next/image";
import './style.css'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaUsersCog } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


export default function Header() {

  const [show, setShow] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const route = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, [])

  const showDropdown = () => setShow(true);
  const hideDropdown = () => setShow(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    route.push('/')
  };

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
            <Nav><Link className="nav-link-custom me-4" href="/players">Players</Link></Nav>
          </Nav>
          <Nav>
            {loggedInUser ? (
              <>
                <div className="dropdown-wrapper">
                  <div onClick={handleToggleDropdown} className="dropdown-wrapper">
                    {loggedInUser.imagem_perfil === '' ? (
                      <Image width={50} src={login_image} className="imagem_perfil me-5" />
                    ) : (
                      <img src={loggedInUser.imagem_perfil} className="imagem_perfil me-5" alt="Profile" />
                    )}
                  </div>
                  {dropdownOpen && (
                    <Dropdown.Menu show className="dropdown-menu-right p-2">
                      <Dropdown.Item className="mb-2">
                        <Link className="link-perfil" href={`/userDashboard/${loggedInUser.id}`}>{loggedInUser.nome}</Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="bg-danger text-white sair-botao" onClick={handleLogoutClick}>
                        Sair <IoIosLogOut className="text-white" />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </div>
                {loggedInUser.email === "admin@admin.com" ? (
                  <>
                    <Nav.Link href="/usersADM" className="ms-5">
                      <FaUsersCog size={25} className="text-white" />
                    </Nav.Link>

                    <Nav.Link href="/usersADM" className="ms-5 text-white">
                      Generos
                    </Nav.Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            )
              :
              <Nav><Link className="nav-link-custom-login" href="/login">Loginㅤ<Image width={50} src={login_image} /></Link></Nav>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
