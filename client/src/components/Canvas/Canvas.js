import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import { Circle, redSquare } from '../Shapes/Circle';
import image from '../../assets/girls.jpg';
import { Button, ButtonGroup, Row, Col, ButtonToolbar } from 'react-bootstrap';

const Canvas = (props) => {
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 500,
      width: 800,
      backgroundColor: 'white',
    });

  const addSquare = (canvas) => {
    canvas.add(redSquare);
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

  return (
    <div>
      <Button onClick={() => addSquare(canvas)}>Add Square</Button>
      <Button onClick={() => addCircle(canvas)}>Add Circle</Button>
      <Button onClick={() => addImage(canvas)}>Add Image</Button>
      <Button onClick={() => removeObject(canvas)}>Remove Selected</Button>
      <Button onClick={() => save()}>Save Image</Button>
      <ButtonToolbar>
        <ButtonGroup>
          <Button
            style={{ backgroundColor: 'green' }}
            onClick={() => colorChange('green')}
          ></Button>
          <Button
            style={{ backgroundColor: 'red' }}
            onClick={() => colorChange('red')}
          ></Button>
          <Button
            style={{ backgroundColor: 'blue' }}
            onClick={() => colorChange('blue')}
          ></Button>
          <Button
            style={{ backgroundColor: 'yellow' }}
            onClick={() => colorChange('yellow')}
          ></Button>
          <Button
            style={{ backgroundColor: 'purple' }}
            onClick={() => colorChange('purple')}
          ></Button>
          <Button
            style={{ backgroundColor: 'black' }}
            onClick={() => colorChange('black')}
          ></Button>
        </ButtonGroup>
      </ButtonToolbar>

      <canvas id='canvas' />
    </div>
  );
};

export default Canvas;
