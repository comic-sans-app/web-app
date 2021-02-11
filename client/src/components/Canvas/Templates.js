import { fabric } from "fabric";

export const fourPanel = (canvas) => {
  const vertLine = new fabric.Rect({
    height: canvas.height,
    left: canvas.width / 2,
    stroke: "black",
    strokeWidth: 3,
  });

  const horizLine = new fabric.Rect({
    width: canvas.width,
    top: canvas.height / 2,
    stroke: "black",
    strokeWidth: 3,
  });
  const fourPanelGroup = new fabric.Group([vertLine, horizLine], {
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
    lockScalingX: true,
    lockScalingY: true,
  });
  canvas.add(fourPanelGroup);
  canvas.renderAll();
};

export const threePanel = (canvas) => {
  const vertLine = new fabric.Rect({
    height: canvas.height,
    left: canvas.width / 2,
    stroke: "black",
    strokeWidth: 3,
  });

  const horizLine = new fabric.Rect({
    width: canvas.width / 2,
    top: canvas.height / 2,
    left: canvas.width / 2,
    stroke: "black",
    strokeWidth: 3,
  });
  const threePanelGroup = new fabric.Group([vertLine, horizLine], {
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
    lockScalingX: true,
    lockScalingY: true,
  });
  canvas.add(threePanelGroup);
  canvas.renderAll();
};

export const sixPanel = (canvas) => {
  const vertLineLeft = new fabric.Rect({
    height: canvas.height,
    left: canvas.width / 3,
    stroke: "black",
    strokeWidth: 3,
  });
  const vertLineRight = new fabric.Rect({
    height: canvas.height,
    left: canvas.width / 1.5,
    stroke: "black",
    strokeWidth: 3,
  });

  const horizLine = new fabric.Rect({
    width: canvas.width,
    top: canvas.height / 2,
    stroke: "black",
    strokeWidth: 3,
  });
  const sixPanelGroup = new fabric.Group(
    [vertLineLeft, vertLineRight, horizLine],
    {
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
    }
  );
  canvas.add(sixPanelGroup);
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
  });

   // This will render  vhorizontal line the width of the canvas, in the middle of the canvas.

  const horizLine = new fabric.Rect({
    width: canvas.width,
    top: canvas.height / 2,
    stroke: 'black',
    strokeWidth: 3,
  });

  // This creates a group so any action done to one line, is done to them all.

  //The variables in the group make it so nothing other than selecting the lines is possible. Now they can be deleted, but not moved, scaled or rotated.

  const fourPanelGroup = new fabric.Group([vertLine, horizLine], {
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
    lockScalingX: true,
    lockScalingY: true,
  });
  canvas.add(fourPanelGroup);
  canvas.renderAll();
};

*/
