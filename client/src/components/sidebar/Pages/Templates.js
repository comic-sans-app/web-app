import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import three from '../../../assets/3panel.png';
import four from '../../../assets/4panel.png';
import six from '../../../assets/6panel.png';
import {threePanel, fourPanel, sixPanel} from '../../Canvas/Templates'

const Templates = () => (
  <div className='open-sidebar-panel'>
    <Row>
      <Col className='sidebar-preview'>
        {/* When we're ready to, the function to add to canvas will be used with a onClick listener on these images. */}
        <Image src={three} fluid rounded />3 Panel
      </Col>
      <Col>
        <Image src={four} fluid rounded />4 Panel
      </Col>
    </Row>
    <Row>
      <Col>
        <Image src={six} fluid rounded />6 Panel
      </Col>
      <Col></Col>
    </Row>
  </div>
);

export default Templates;
