import { Button, Container } from 'react-bootstrap'
import React, { Component } from 'react'
import '../../styles/Collapsible.css'

export default class Collapsible extends Component {

  constructor(props){
    super(props)
  }

  render(){

    console.log(this.props)

    return (
      <div>
        {/* only render button when sidebar isn't open
        <Button
          variant="light"
          id='collapse-sidebar'
        >
          <i className="fas fa-angle-left"></i>
        </Button>

        {this.state.open ?
          null
          :
          <Container id='collapsible'>
            SIDE PANEL EXPANDED
          </Container>
        } */}
      </div>
    )
  }
}
