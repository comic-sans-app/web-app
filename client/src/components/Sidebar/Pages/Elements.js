import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import Bubbles from '../../TextBubbles/Bubbles'

const Elements = () => (
  <div className='open-sidebar-panel'>
    <Row>
      <Col className='p-0'>
      <Bubbles />
      {/* <Image fluid/> */}
      </Col>
    </Row>
  </div>
)

export default Elements;
