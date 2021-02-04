import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import '../../styles/SideNav.css';
import '../../styles/Collapsible.css';
import Routes from './sidebarRoutes';

export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
  }

  openPanel(event) {
    this.setState({ open: true });
  }

  closePanel(event) {
    this.setState({ open: false });
  }

  render() {
    return (
      <>
        <Navbar
          bg='dark'
          variant='dark'
          className='d-flex flex-column m-0'
          id='side-nav'
        >
          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/templates'
              onClick={this.openPanel}
              name='templates'
            >
              <i className='fas fa-border-all'></i>
              <p>Templates</p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/characters'
              onClick={this.openPanel}
              name='characters'
            >
              <i className='fas fa-smile'></i>
              <p>Characters</p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/elements'
              onClick={this.openPanel}
              name='elements'
            >
              <i className='fas fa-shapes'></i>
              <p>Elements</p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to='/text' onClick={this.openPanel} name='text'>
              <i className='fas fa-font'></i>
              <p>Text</p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/uploads'
              onClick={this.openPanel}
              name='uploads'
            >
              <i className='fas fa-cloud-upload-alt'></i>
              <p>Uploads</p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/photos'
              onClick={this.openPanel}
              name='photos'
            >
              <i className='fas fa-image'></i>
              <p>Photos</p>
            </Nav.Link>
          </Nav.Item>
        </Navbar>

        {/* collapsible sidebar */}
        <div>
          {this.state.open ? (
            <Container id='collapsible'>
              <Button
                variant='light'
                id='collapse-btn'
                onClick={this.closePanel}
              >
                <i className='fas fa-angle-left'></i>
              </Button>
              <Routes />
            </Container>
          ) : null}
        </div>
      </>
    );
  }
}
