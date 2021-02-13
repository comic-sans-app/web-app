import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { authLogin, authSignup, me, logout } from "../../store/index";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  logout() {
    this.props.signout();
  }

  render() {
    return (
      <div>
        <Navbar id="top-nav">
          <Navbar.Brand as={Link} to="/home">
            Comic Sans
          </Navbar.Brand>

          <Nav.Link as={Link} to="/editor">
            Create
          </Nav.Link>

          <Container className="d-flex justify-content-end" fluid>
            <h5 className="nav-tag-line m-0">Creativity sans borders!</h5>
            <Button
              className="logout-button"
              as={Link}
              to="/"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (userName, password) => dispatch(authSignup(userName, password)),
    login: (userName, password) => dispatch(authLogin(userName, password)),
    currentUser: () => dispatch(me()),
    signout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
