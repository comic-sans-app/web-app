import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import {
  Button,
} from 'react-bootstrap';
import { colors } from '../../assets/colorPickerColors'

export default class ColorPicker extends Component {

  constructor(props){
    super(props)
    this.colorChange = this.colorChange.bind(this)
  }

  colorChange = (color, canvas) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.set({ fill: color });
      canvas.renderAll();
    });
  };

  render() {

    const canvas = this.props.canvas

    return (
      <Container className='color-picker-container m-2 p-0' fluid>
        {colors.map(color =>
          <Button
            key={color}
            className="color-picker-box"
            style={{ backgroundColor: color, border: 'none' }}
            onClick={() => this.colorChange(color, canvas)}
          ></Button>
        )}
      </Container>
    )
  }
}

