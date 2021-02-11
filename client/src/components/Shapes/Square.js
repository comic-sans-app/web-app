import { fabric } from "fabric";

export const Square = (canvas) => {
  let square = new fabric.Rect({
    height: 200,
    width: 200,
    fill: "red",
  });
  canvas.add(square);
  canvas.renderAll();
};

// creates a white square, the size of the canvas to act as background when saving.

export const createBack = (canvas) => {
  const backSq = new fabric.Rect({
    id: "back",
    height: canvas.height,
    width: canvas.width,
    fill: "white",
    selectable: false,
  });
  removeSquare(canvas);
  canvas.add(backSq);
  setSquare(canvas);
  canvas.renderAll();
};

// Removes previous background
export const removeSquare = (canvas) => {
  canvas.getObjects().forEach((obj) => {
    if (obj.id === "back") {
      canvas.getActiveObject(obj);
      canvas.remove(obj);
    }
  });
};

// Sets the background square all the way to bottom layer
export const setSquare = (canvas) => {
  canvas.getObjects().forEach((obj) => {
    if (obj.id === "back") {
      canvas.getActiveObject(obj);
      obj.sendToBack();
    }
  });
};
