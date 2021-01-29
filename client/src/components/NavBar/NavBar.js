import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'


const NavigationBar = () => (
    <div>
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Comic Sans</Navbar.Brand>
                <Nav className="mr-auto">
                    {/* guest/signed out user will see home, signup, log in */}
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#signup">Sign Up</Nav.Link>
                <Nav.Link href="#login">Log in</Nav.Link>
                    {/* signed in user will see */}
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#history">Your Saved Comics!</Nav.Link>
                <Nav.Link href="#logout">Log Out</Nav.Link>
            </Nav>
        </Navbar>
    </div>
)

export default NavigationBar;
