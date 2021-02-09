import { fabric } from 'fabric';

export const Square = (canvas) => {
    let square = new fabric.Rect({
    height: 200,
    width: 200,
    fill: 'red'
  });
  canvas.add(square);
  canvas.renderAll();
}


  
  