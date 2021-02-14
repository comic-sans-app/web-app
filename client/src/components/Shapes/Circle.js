import { fabric } from "fabric";
import { colors } from "../../assets/colorPickerColors";

export const Circle = (canvas) => {
  const randomTop = Math.floor(Math.random() * (300 - 30) + 30);
  const randomLeft = Math.floor(Math.random() * (600 - 20) + 20);
  const palette =
    colors[Math.floor(Math.random() * (colors.length - 1 - 0) + 0)];
  let circle = new fabric.Circle({
    radius: 50,
    fill: palette,
    top: randomTop,
    left: randomLeft,
  });
  canvas.add(circle);
  canvas.renderAll();
};
