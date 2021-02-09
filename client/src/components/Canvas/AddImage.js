import { fabric } from 'fabric';
import image from '../../assets/girls.jpg';

export const AddImage = (canvas) => {
    new fabric.Image.fromURL(image, function (img) {
      img.scale(0.1)
      canvas.add(img);
      // canvas.renderAll();
    });
  };


