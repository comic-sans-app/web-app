import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { Circle } from '../Shapes';

const Canvas = (props) => {
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 700,
      width: 700,
      backgroundColor: 'pink',
    });

    canvas.add(Circle)

  return (
    <div>
      <canvas id='canvas' />
    </div>
  );
};

export default Canvas;
