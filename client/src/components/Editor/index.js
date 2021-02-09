import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import CanvasControls from '../Canvas/index';
import { authLogin, authSignup, me } from '../../store/index';
import ModalForm from './ModalForm';

class Editor extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.currentUser();
  }

  handleSubmit() {
    console.log('Submitted!');
  }

  render() {
    return (
      // <div>
      //   {!this.props.user.userName ? <ModalForm /> : <div />}
      //   <Container className="vh-90" fluid>
      //     <Row>
      //       <Col sm={12}>
      //         {/* Canvas column */}
      //         <CanvasControls />
      //       </Col>
      //     </Row>
      //   </Container>
      // </div>
      <ModalForm
        isOpen={!this.props.user.userName}
        handleSubmit={this.handleSubmit}
      />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

// MODAL CODE FOR THIS COMPONENT?
// import ModalForm from './component/ModalForm';
// class App extends React.Component {
//   state = {
//     isOpen: true
//   }

//   openModal = () => this.setState({ isOpen: true });
//   closeModal = () => this.setState({ isOpen: false });
//   handleSubmit(name) => //some code

//   render(){
//     return(
//       <div>
//         {/* other components */}

//         <button onClick={this.openModal}>Display Modal Form</button>

//         { this.state.isOpen ?
//           <ModalForm
//             closeModal={this.closeModal}
//             isOpen={this.state.isOpen}
//             handleSubmit={this.handleSubmit}
//           />
//           :
//           null
//         }
//       </div>
//     )
//   }
// }
