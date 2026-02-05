import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-warehouse me-2"></i>
          Inventory Control System
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <i className="fas fa-tachometer-alt me-1"></i>
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/products">
              <i className="fas fa-box me-1"></i>
              Products
            </Nav.Link>

            <Nav.Link as={Link} to="/raw-materials">
              <i className="fas fa-cubes me-1"></i>
              Raw Materials
            </Nav.Link>

            <Nav.Link as={Link} to="/production-suggestions">
              <i className="fas fa-lightbulb me-1"></i>
              Production Suggestions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
