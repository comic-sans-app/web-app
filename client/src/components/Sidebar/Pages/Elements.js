import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

const Elements = () => (
  <div className='sidebar-preview'>
    <Row>
      <Col>
      <Image fluid/>
      </Col>
      <Col>
      <Image fluid/>
      </Col>
    </Row>
  </div>
)

export default Elements
