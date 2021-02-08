import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import Characters from '../../Characters/Characters';

const CharactersBar = () => (
  <div className='open-sidebar-panel'>
    <Row>
      <Col className='p-0'>
        <h4 className="sidebar-img-title">Characters</h4>
        <Characters />
        {/* <Image fluid /> */}
      </Col>
    </Row>
  </div>
);

export default CharactersBar;
