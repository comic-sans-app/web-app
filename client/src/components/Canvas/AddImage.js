import { fabric } from "fabric";

export const AddImage = (canvas, image) => {
  const randomTop = Math.floor(Math.random() * (300 - 30) + 30);
  const randomLeft = Math.floor(Math.random() * (600 - 20) + 20);
  new fabric.Image.fromURL(
    image,
    function (img) {
      img.scale(0.1);
      canvas.add(img);
    },
    { top: randomTop, left: randomLeft }
  );
};
