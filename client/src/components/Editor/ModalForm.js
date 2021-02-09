import React from 'react';
import { Modal, Button, Form, Tabs, Tab } from 'react-bootstrap';

export default class ModalForm extends React.Component {
  state = { name: '', password: '' };

  handleNameChange = (e) => this.setState({ name: e.target.value });

  handlePasswordChange = (e) => this.setState({ password: e.target.value });

  render() {
    return (
      <div>
        {/* <h1>Here's the modal form.</h1> */}
        <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Log In or Sign Up!</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <Tabs defaultActiveKey='login'>
              <Tab eventKey='login' title='Log In!'>
                <Form.Group>
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder='name'
                  />
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder='password'
                  />
                </Form.Group>
                <Button
              variant='primary'
              type='submit'
              onClick={() =>
                this.props.handleSubmit(this.state.name, this.state.password, 'login')
              }
            >
              Log In!
            </Button>
              </Tab>
              <Tab eventKey='signup' title='Sign Up!'>
                <Form.Group>
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder='name'
                  />
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder='password'
                  />
                </Form.Group>
                <Button
              variant='primary'
              type='submit'
              onClick={() =>
                this.props.handleSubmit(this.state.name, this.state.password, 'signup')
              }
            >
              Sign Up!
            </Button>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
