import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default class ModalForm extends React.Component {
  state = { name: null };

  handleChange = (e) => this.setState({ name: e.target.value });

  render() {
    return (
      <div>
        <h1>Here's the modal form.</h1>
        <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal Form Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="name input"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={() => this.props.handleSubmit(this.state.name)}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
