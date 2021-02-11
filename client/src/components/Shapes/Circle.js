import { fabric } from "fabric";

export const Circle = (canvas) => {
  let circle = new fabric.Circle({
    radius: 50,
    fill: "blue",
    strokeWidth: 3,
  });
  canvas.add(circle);
  canvas.renderAll();
};
