import React from "react";
import { Container, Card } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import "../../styles/Home.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container id="home" fluid>
      <NavBar />

      <Container fluid>
        <Row>
          <Col lg={6}>
            <Card className="d-flex justify-content-center">
              <Card.Body>
                <h1 className="pb-5">
                  Focus on what's important. Create comics, sans complicated
                  tools.
                </h1>
              </Card.Body>
              <Button as={Link} to="/editor" id="start-designing">
                Start designing
              </Button>
            </Card>
          </Col>

          <Col lg={6}>
            {/* replace this gif when the app is ready */}
            <img className="gif" src="https://i.imgur.com/6GQXaeL.gif" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
