import { fabric } from "fabric";

export const AddImage = (canvas, image) => {
  new fabric.Image.fromURL(image, function (img) {
    img.scale(0.1);
    canvas.add(img);
    // canvas.renderAll();
  });
};
