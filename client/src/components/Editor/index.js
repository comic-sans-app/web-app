import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import CanvasControls from "../Canvas/index";
import { authLogin, authSignup, me } from "../../store/user";
import ModalForm from "./ModalForm";

class Editor extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.currentUser();
  }

  handleSubmit(userName, password, method) {
    // event.preventDefault()
    if (method === "signup") {
      this.props.signup(userName, password);
    } else this.props.login(userName, password);
  }

  render() {
    return (
      <div>
        <ModalForm
          isOpen={!this.props.user.userName}
          closeModal={!!this.props.user.userName}
          handleSubmit={this.handleSubmit}
          error={this.props.error}
        />
        <Container fluid>
          <Row>
            <Col sm={12} className="editor">
              {/* Canvas column */}
              <CanvasControls />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, error: state.user.error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (userName, password) => dispatch(authSignup(userName, password)),
    login: (userName, password) => dispatch(authLogin(userName, password)),
    currentUser: () => dispatch(me()),
    // signout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
