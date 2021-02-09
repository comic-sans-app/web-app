import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import CanvasControls from '../Canvas/index';
import { authLogin, authSignup, me } from '../../store/index';

class Editor extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.currentUser();
  }

  render() {
    if (this.props.user.userName) {
      return (
        <Container className='vh-90' fluid>
          <Row>
            <Col sm={12}>
              {/* Canvas column */}
              <CanvasControls />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <h1>YOU'RE NOT LOGGED IN. TOO BAD!</h1>
    }
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
