import { fabric } from "fabric";
import { colors } from "../../assets/colorPickerColors";

export const Square = (canvas) => {
  const randomTop = Math.floor(Math.random() * (300 - 20) + 20);
  const randomLeft = Math.floor(Math.random() * (600 - 30) + 30);
  const palette =
    colors[Math.floor(Math.random() * (colors.length - 1 - 0) + 0)];
  let square = new fabric.Rect({
    height: 200,
    width: 200,
    fill: palette,
    top: randomTop,
    left: randomLeft,
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
