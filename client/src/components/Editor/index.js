import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from '../sidebar';

export default function Editor() {
  return (
    <Container className='vh-90' fluid>
      <Row>
        <Col sm={1} style={{ height: '90vh' }}>
          <Sidebar />
        </Col>

        <Col sm={11} style={{ backgroundColor: '#e4e4f5' }}>
          {/* Canvas column */}
          Canvas
        </Col>
      </Row>
    </Container>
  );
}
