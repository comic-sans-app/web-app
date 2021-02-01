import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import { Circle, redSquare } from '../Shapes/Circle';
import image from '../../assets/girls.jpg'

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
    }
  );

  const addSquare = (canvas) => {
    canvas.add(redSquare)
    canvas.renderAll()
  }

  const save = () => {
    var canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
      saveAs(blob, 'comic.png');
    });
  };

  const addCircle = (canvas) => {
    canvas.add(Circle)
    canvas.renderAll()
  }

  const addImage = (canvas) => {

    // svgs will not work
    new fabric.Image.fromURL(image, function(img){
      img.scale(0.1).set('flipX', true)
      canvas.add(img)
      canvas.renderAll()
    })
  }


  return (
    <div>
      <button onClick={() => addSquare(canvas)}>Add Square</button>
      <button onClick={() => addCircle(canvas)}>Add Circle</button>
      <button onClick={() => addImage(canvas)}>Add Image</button>
      <button onClick={() => save()}>Save Image</button>
      <canvas id='canvas'/>
    </div>
  );
};

export default Canvas;
