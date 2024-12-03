import React, { useContext, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LogoutModal from "../pages/logout";

const AppNavbar = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="#" className=" d-flex align-itens-center">
            <img
              src="/logo.jpg"
              alt="ShopNest Logo"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            />
            ShopNest
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user && (
              <>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/products">
                    Products
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    Cart
                  </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                  <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LogoutModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default AppNavbar;
