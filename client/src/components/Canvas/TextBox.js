import React from 'react';
import Button from 'react-bootstrap';
import { fabric } from 'fabric';

//trying to take textbox out of the entire canvas.js file and make it its own component: NOT FINISHED YET
//KP: leave the add text as let bc with const I could not actually adjust the txt on click

class TextBox extends React.Component {
    addText = (canvas) => {
    let text = new fabric.Textbox('Your text here...', {
      width: 300,
      height: 300,
      top: 5,
      left: 5,
      hasControls: true, //this lets you rotate the box/adjust sizing the way you can with shapes
      fontSize: 25,
      fontFamily: 'Verdana', //'Comic Sans MS'
    });

    canvas.add(text);
  };
  render(){
      return (
           <Button
                className="btn btn-secondary"
                onClick={() => this.addText(this.state.canvas)}>Add Text
            </Button>
      )
  }
}

export default TextBox;