import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import three from '../../../assets/3panel.png';
import four from '../../../assets/4panel.png';
import six from '../../../assets/6panel.png';
import {threePanel, fourPanel, sixPanel} from '../../Canvas/Templates'

const Templates = () => (
  <div className='open-sidebar-panel'>
    <Row>
      <Col className='p-0'>
        {/* When we're ready to, the function to add to canvas will be used with a onClick listener on these images. */}
        <Image src={three} className='p-2' fluid rounded/>
      </Col>
      <Col className='p-0'>
        <Image src={four} className='p-2' fluid rounded/>
      </Col>
    </Row>
    <Row>
      <Col className='p-0'>
        <Image src={six} className='p-2' fluid rounded/>
      </Col>
      <Col className='p-0'></Col>
    </Row>
  </div>
);

export default Templates;
