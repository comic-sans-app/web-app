import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CanvasControls from "../Canvas/index";

export default function Editor() {
  return (
    <Container className="vh-90" fluid>
      <Row>
        <Col sm={12}>
          {/* Canvas column */}
          <CanvasControls />
        </Col>
      </Row>
    </Container>
  );
}
