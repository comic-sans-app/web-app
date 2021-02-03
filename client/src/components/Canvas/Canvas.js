import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import image from '../../assets/girls.jpg';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import '../../styles/canvas.css';
import { fourPanel, threePanel, sixPanel } from './Templates';
//import { GithubPicker } from 'react-color';

const Canvas = (props) => {
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  let windowHeightRatio = Math.floor(0.85 * window.innerHeight);
  let windowWidthRatio = Math.floor(0.85 * window.innerWidth);

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      //1:1 ratio
      height: windowHeightRatio,
      width: windowWidthRatio,
      backgroundColor: 'white',
    });

  const addSquare = (canvas) => {
    const square = new fabric.Rect({
      height: 200,
      width: 200,
      fill: 'red',
    });
    canvas.add(square);
    canvas.renderAll();
  };

  const save = () => {
    var canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
      saveAs(blob, 'comic.png');
    });
  };

  const addCircle = (canvas) => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'blue',
      stroke: 'green',
      strokeWidth: 3,
    });
    canvas.add(circle);
    canvas.renderAll();
  };

  const addImage = (canvas) => {
    // svgs will not work
    new fabric.Image.fromURL(image, function (img) {
      img.scale(0.1).set('flipX', true);
      canvas.add(img);
      canvas.renderAll();
    });
  };

  const removeObject = () => {
    let activeObject = canvas.getActiveObjects();
    if (activeObject) {
      canvas.discardActiveObject();
      activeObject.forEach(function (object) {
        canvas.remove(object);
      });
    }
  };

  const colorChange = (color) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.set({ fill: color });
      canvas.renderAll();
    });
  };

  const sendFront = () => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.bringToFront();
      canvas.renderAll();
    });
  };
  const sendBack = () => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.sendToBack();
      canvas.renderAll();
    });
  };

  //KP: leave the add text as let bc with const I could not actually adjust the txt on click
  let addText = () => {
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
    <div className='col-md-12 text-center'>
      <ButtonToolbar>
        <ButtonGroup>
          <Button
            className='color-picker-box'
            style={{ backgroundColor: 'green' }}
            onClick={() => colorChange('green')}
          ></Button>
          <Button
            className='color-picker-box'
            style={{ backgroundColor: 'red' }}
            onClick={() => colorChange('red')}
          ></Button>
          <Button
            className='color-picker-box'
            style={{ backgroundColor: 'blue' }}
            onClick={() => colorChange('blue')}
          ></Button>
          <Button
            className='color-picker-box'
            style={{ backgroundColor: 'yellow' }}
            onClick={() => colorChange('yellow')}
          ></Button>
          <Button
            className='color-picker-box'
            style={{ backgroundColor: 'purple' }}
            onClick={() => colorChange('purple')}
          ></Button>
          <Button
            className='color-picker-box'
            style={{ backgroundColor: 'black' }}
            onClick={() => colorChange('black')}
          ></Button>
        </ButtonGroup>
      </ButtonToolbar>
      <Button className='btn btn-secondary' onClick={() => addSquare(canvas)}>
        Add Square
      </Button>
      <Button className='btn btn-secondary' onClick={() => addCircle(canvas)}>
        Add Circle
      </Button>
      <Button className='btn btn-secondary' onClick={() => addImage(canvas)}>
        Add Image
      </Button>
      <Button className='btn btn-secondary' onClick={() => addText(canvas)}>
        Add Text
      </Button>
      <Button
        className='btn btn-secondary'
        onClick={() => removeObject(canvas)}
      >
        Remove Selected
      </Button>
      <Button className='btn btn-secondary' onClick={() => save()}>
        Save Image
      </Button>
      <Button className='btn btn-secondary' onClick={() => sendFront(canvas)}>
        Front
      </Button>
      <Button className='btn btn-secondary' onClick={() => sendBack(canvas)}>
        Back
      </Button>
      <DropdownButton title='Templates' variant='secondary'>
        <Dropdown.Item onSelect={() => threePanel(canvas)}>
          3 Panel
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => fourPanel(canvas)}>
          4 Panel
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => sixPanel(canvas)}>6 Panel</Dropdown.Item>
      </DropdownButton>
      {/* <GithubPicker onChange={() => colorChange()}/> */}
      <canvas id='canvas' width='600' height='600' />
    </div>
  );
};

export default Canvas;
