import { fabric } from "fabric";

export const removePanel = (canvas) => {
  canvas.getObjects().forEach((obj) => {
    if (obj.id === "panel") {
      canvas.getActiveObject(obj);
      canvas.remove(obj);
    }
  });
};

export const threePanel = (canvas) => {
  const vertLine = new fabric.Rect({
    id: "panel",
    height: canvas.height,
    left: canvas.width / 2,
    stroke: "black",
    strokeWidth: 3,
    selectable: false,
  });

  const horizLine = new fabric.Rect({
    id: "panel",
    width: canvas.width / 2,
    top: canvas.height / 2,
    stroke: "black",
    left: canvas.width / 2,
    strokeWidth: 3,
    selectable: false,
  });
  removePanel(canvas);
  canvas.add(vertLine, horizLine);
  canvas.renderAll();
};

export const fourPanel = (canvas) => {
  const vertLine = new fabric.Rect({
    id: "panel",
    height: canvas.height,
    left: canvas.width / 2,
    stroke: "black",
    strokeWidth: 3,
    selectable: false,
  });

  const horizLine = new fabric.Rect({
    id: "panel",
    width: canvas.width,
    top: canvas.height / 2,
    stroke: "black",
    strokeWidth: 3,
    selectable: false,
  });
  removePanel(canvas);
  canvas.add(vertLine, horizLine);
  canvas.renderAll();
};

export const sixPanel = (canvas) => {
  const vertLineLeft = new fabric.Rect({
    id: "panel",
    height: canvas.height,
    left: canvas.width / 3,
    stroke: "black",
    strokeWidth: 3,
    selectable: false,
  });
  const vertLineRight = new fabric.Rect({
    id: "panel",
    height: canvas.height,
    left: canvas.width / 1.5,
    stroke: "black",
    strokeWidth: 3,
    selectable: false,
  });

  const horizLine = new fabric.Rect({
    id: "panel",
    width: canvas.width,
    top: canvas.height / 2,
    stroke: "black",
    strokeWidth: 3,
    selectable: false,
  });
  removePanel(canvas);
  canvas.add(vertLineLeft, vertLineRight, horizLine);
  canvas.renderAll();
};

//SAMPLE 'BOILER' TEMPLATE
/*

export const TEMPLATE_NAME = (canvas) => {
  // This will render a verticle line the height of the canvas, in the middle of the canvas.

  const vertLine = new fabric.Rect({
    height: canvas.height,
    left: canvas.width / 2,
    stroke: 'black',
    strokeWidth: 3,
    selectable: false,
  });

   // This will render  vhorizontal line the width of the canvas, in the middle of the canvas.

  const horizLine = new fabric.Rect({
    width: canvas.width,
    top: canvas.height / 2,
    stroke: 'black',
    strokeWidth: 3,
    selectable: false,
  });

// clears all panels currently on canvas & creates newly defined panels

  removePanels()
  canvas.add(vertLine, horizLine);
  canvas.renderAll();
};

*/
