import React from 'react'
import {Link} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap';
import '../../styles/SideNav.css'

export default function SideNav() {
  return (
    <Navbar bg="dark" variant="dark" className='d-flex flex-column' id='side-nav'>
      <Nav.Item>
        <Nav.Link as={Link} to="/templates">
          <i className="fas fa-border-all"></i>
          <p>Templates</p>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/characters">
          <i className="fas fa-smile"></i>
          <p>Characters</p>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/shapes">
          <i className="fas fa-shapes"></i>
          <p>Elements</p>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/text">
          <i className="fas fa-font"></i>
          <p>Text</p>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/uploads">
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Uploads</p>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/photos">
          <i className="fas fa-image"></i>
          <p>Photos</p>
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  )
}
