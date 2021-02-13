import React from "react";
import { FormText } from "react-bootstrap";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import "../../styles/AuthModal.css";

export default class ModalForm extends React.Component {
  state = { name: "", password: "" };

  handleNameChange = (e) => this.setState({ name: e.target.value });

  handlePasswordChange = (e) => this.setState({ password: e.target.value });

  resetState = () => {
    this.setState({ name: "", password: "" });
  };

  render() {
    const isErrorDisplayed = this.props.error;

    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} centered>
          <Modal.Body className="modal-body">
            <Tabs defaultActiveKey="signup">
              <Tab eventKey="login" title="Log In" className="p-2">
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder="enter username"
                    required
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder="enter password"
                  />
                  <FormText>
                    {isErrorDisplayed ? (
                      <p className="m-2" style={{ color: "#b02c2c" }}>
                        {this.props.error &&
                          this.props.error.response &&
                          this.props.error.response.data}
                      </p>
                    ) : null}
                  </FormText>
                </Form.Group>
                <Button
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
                  Log In
                </Button>
              </Tab>
              <Tab eventKey="signup" title="Sign Up" className="p-2">
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder="Pick a fun username!"
                  />
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    required
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder="enter password"
                  />
                  <FormText>
                    {isErrorDisplayed ? (
                      <p className="m-2" style={{ color: "#b02c2c" }}>
                        {this.props.error &&
                          this.props.error.response &&
                          this.props.error.response.data}
                      </p>
                    ) : null}
                  </FormText>
                </Form.Group>
                <Button
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
                  Create my account
                </Button>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
