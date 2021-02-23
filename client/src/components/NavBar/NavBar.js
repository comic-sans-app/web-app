import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { authLogin, authSignup, me, logout } from "../../store/user";
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
            {this.props.user.userName ? (
              <Link
                className="auth-button"
                to="/"
                onClick={() => {
                  this.logout();
                }}
              >
                Sign Out
              </Link>
            ) : (
              <Link
                className="auth-button"
                to="/editor"
                onClick={() => {
                  this.logout();
                }}
              >
                Log In or Sign Up <i className="fas fa-chevron-right"></i>
              </Link>
            )}
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
