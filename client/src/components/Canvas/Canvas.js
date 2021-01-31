import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';

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

  const save = () => {
    var canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
      saveAs(blob, 'comic.png');
    });
  };

  return (
    <div>
      <button onClick={() => save()}>Save Image</button>
      <canvas id='canvas' />
    </div>
  );
};

export default Canvas;
