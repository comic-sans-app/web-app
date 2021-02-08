import React from 'react';
import Button from 'react-bootstrap';
import { fabric } from 'fabric';

//trying to take textbox out of the entire canvas.js file and make it its own component: NOT FINISHED YET
//KP: leave the add text as let bc with const I could not actually adjust the txt on click

const TextBox = (props) => {
    let addText = (canvas) => {
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
      return (
           <Button
                className="btn btn-secondary"
                onClick={() => addText(this.props.canvas)}>Add Text
            </Button>
      )
}

export default TextBox;