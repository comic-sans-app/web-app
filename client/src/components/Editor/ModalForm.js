import React from "react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";

export default class ModalForm extends React.Component {
  state = { name: "", password: "" };

  handleNameChange = (e) => this.setState({ name: e.target.value });

  handlePasswordChange = (e) => this.setState({ password: e.target.value });

  resetState = () => {
    this.setState({ name: "", password: "" });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} centered>
          <Modal.Body className="modal-body">
            <Tabs defaultActiveKey="signup">
              <Tab eventKey="login" title="Log In!">
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder="username"
                  />
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder="password"
                  />
                </Form.Group>
                <Button
                  variant="outline-light"
                  type="submit"
                  onClick={() => {
                    this.props.handleSubmit(
                      this.state.name,
                      this.state.password,
                      "login"
                    );
                    this.resetState();
                  }}
                >
                  <i className="fas fa-sign-in-alt"></i>
                </Button>
                {this.props.error && this.props.error.response && (
                  <div> {this.props.error.response.data} </div>
                )}
              </Tab>
              <Tab eventKey="signup" title="Sign Up!">
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder="Pick a fun username!"
                  />
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder="password"
                  />
                </Form.Group>
                <Button
                  variant="outline-light"
                  type="submit"
                  onClick={() => {
                    this.props.handleSubmit(
                      this.state.name,
                      this.state.password,
                      "signup"
                    );
                    this.resetState();
                  }}
                >
                  <i className="fas fa-sign-in-alt"></i>
                </Button>
                {this.props.error && this.props.error.response && (
                  <div> {this.props.error.response.data} </div>
                )}
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
