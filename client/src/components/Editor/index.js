import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import CanvasControls from '../Canvas/index';

export default function Editor() {
  return (
    <Container className='vh-90' fluid>
      <Row>
        <Col sm={1} style={{ height: '90vh' }}>
          <Sidebar />
        </Col>

        <Col sm={11} className='d-flex align-items-center justify-content-center'>
          {/* Canvas column */}
          <CanvasControls />
        </Col>
      </Row>
    </Container>
  );
}
