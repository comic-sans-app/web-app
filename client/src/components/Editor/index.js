import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Editor() {
  return (
    <Container className='vh-90' fluid>
      <Row>
        <Col sm={1} style={{backgroundColor: '#9e9ea3', height: '90vh'}}>
          {/* SideBar column */}
          Sidebar
        </Col>

        <Col sm={11} style={{backgroundColor: '#e4e4f5'}}>
          {/* Canvas column */}
          Canvas
        </Col>
      </Row>
    </Container>
  )
}
