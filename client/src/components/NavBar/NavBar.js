import React from "react";
import { Nav } from "react-bootstrap";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => (
  <div>
    <Navbar id="top-nav">
      <Navbar.Brand as={Link} to="/home">
        Comic Sans
      </Navbar.Brand>

      <Nav.Link as={Link} to="/editor">
        Create
      </Nav.Link>

      <Container className="d-flex justify-content-end" fluid>
        <h5 className="nav-tag-line m-0">Creativity sans borders!</h5>
      </Container>
      {/* <Nav className="mr-auto"> */}
      {/* guest/signed out user will see home, signup, log in */}
      {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#signup">Sign Up</Nav.Link>
              <Nav.Link href="#login">Log in</Nav.Link> */}
      {/* signed in user will see */}
      {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#history">Your Saved Comics!</Nav.Link>
                <Nav.Link href="#logout">Log Out</Nav.Link> */}
      {/* </Nav> */}
    </Navbar>
  </div>
);

export default NavigationBar;
