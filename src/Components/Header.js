import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import man from '../Assets/man.jpg'
import Logo from '../Assets/musical-note.png'


function Header() {

  let navigate = useNavigate();
  let logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="/home">
            <img
              src={Logo}
              alt="beat-with-music"
              height="28px"
            />{" "}
            Beat With Music
          </Navbar.Brand>
          <Nav >
            <div className="navigation">
              <p
                className="button log-hover"
                style={{ textDecoration: "none" }}
              >
                <img
                  className="logout-image"
                  src={man}
                  alt="logout"
                />
                <div
                  className="logout"
                  onClick={() => logout()}
                  style={{ cursor: "pointer" }}
                >
                  LOGOUT
                </div>
              </p>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
