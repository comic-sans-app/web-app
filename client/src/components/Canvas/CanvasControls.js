import React from "react";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import { canvasControlsCopy } from "./Copy";
import { saveCanvasElements } from "../../store/canvas";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { removeSquare, createBack } from "../Shapes/Square";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";

class CanvasControls extends React.Component {
  constructor() {
    super();
    this.removeObject = this.removeObject.bind(this);
    this.save = this.save.bind(this);
    this.sendFront = this.sendFront.bind(this);
    this.sendBack = this.sendBack.bind(this);
    this.saveToStore = this.saveToStore.bind(this);
    this.createEventListener = this.createEventListener.bind(this);
    this.deleteWithKeyboard = this.deleteWithKeyboard.bind(this);
  }

  componentDidMount() {
    this.createEventListener();
  }

  save = (canvasInstance) => {
    var canvas = document.getElementById("canvas");
    createBack(canvasInstance);
    canvas.toBlob(function (blob) {
      saveAs(blob, "comic.png");
    });
    removeSquare(canvasInstance);
  };

  saveToStore = (canvas, selectedCanvasId) => {
    this.props.saveCanvas(canvas.getObjects(), selectedCanvasId);
    toast.notify("Comic Saved!", {
      position: "top-right",
    });
  };

  removeObject = (canvas) => {
    let activeObject = canvas.getActiveObjects();
    if (activeObject) {
      canvas.discardActiveObject();
      activeObject.forEach(function (object) {
        canvas.remove(object);
      });
    }
  };

  clearCanvas = (canvas) => {
    canvas.getObjects().forEach((obj) => {
      canvas.getActiveObject(obj);
      canvas.remove(obj);
    });
  };

  sendFrontOne = (canvas) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.bringForward();
      canvas.renderAll();
    });
  };

  sendFront = (canvas) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.bringToFront();
      canvas.renderAll();
    });
  };

  sendBackOne = (canvas) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.sendBackwards();
      canvas.renderAll();
    });
  };

  sendBack = (canvas) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.sendToBack();
      canvas.renderAll();
    });
  };

  createEventListener() {
    document.addEventListener("keydown", this.deleteWithKeyboard);
  }

  deleteWithKeyboard(event) {
    if (
      !(event.target.localName === "textarea") &&
      (event.key === "Backspace" || event.key === "Delete")
    ) {
      this.removeObject(this.props.canvasInstance);
    }
  }

  render() {
    const canvasInstance = this.props.canvasInstance;
    const selectedCanvasId = this.props.selectedCanvasId;

    return (
      <>
        {/* send up just one layer */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.bringUpOne}</Tooltip>}
        >
          <Button
            variant="light"
            onClick={() => this.sendFrontOne(canvasInstance)}
          >
            <i className="fas fa-angle-up"></i>
          </Button>
        </OverlayTrigger>

        {/* send down just one layer */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.bringDownOne}</Tooltip>}
        >
          <Button
            variant="light"
            onClick={() => this.sendBackOne(canvasInstance)}
          >
            <i className="fas fa-angle-down"></i>
          </Button>
        </OverlayTrigger>

        {/* send all the way to top layer */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.bringUp}</Tooltip>}
        >
          <Button
            variant="light"
            onClick={() => this.sendFront(canvasInstance)}
          >
            <i className="fas fa-angle-double-up"></i>
          </Button>
        </OverlayTrigger>

        {/* send all the way to bottom layer */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.bringDown}</Tooltip>}
        >
          <Button variant="light" onClick={() => this.sendBack(canvasInstance)}>
            <i className="fas fa-angle-double-down"></i>
          </Button>
        </OverlayTrigger>

        {/* save to store button */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.save}</Tooltip>}
        >
          <Button
            variant="light"
            onClick={() => this.saveToStore(canvasInstance, selectedCanvasId)}
          >
            <i className="far fa-save"></i>
          </Button>
        </OverlayTrigger>

        {/* download as image button */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.download}</Tooltip>}
        >
          <Button variant="light" onClick={() => this.save(canvasInstance)}>
            <i className="fas fa-file-download"></i>
          </Button>
        </OverlayTrigger>

        {/* delete selected element(s) button */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.delete}</Tooltip>}
        >
          <Button
            variant="light"
            onClick={() => this.removeObject(canvasInstance)}
          >
            <i className="fas fa-eraser"></i>
          </Button>
        </OverlayTrigger>

        {/* clear canvas button */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{canvasControlsCopy.clearCanvas}</Tooltip>}
        >
          <Button
            variant="outline-danger"
            onClick={() => this.clearCanvas(canvasInstance)}
          >
            <i className="far fa-trash-alt"></i>
          </Button>
        </OverlayTrigger>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCanvas: (canvas, id) => dispatch(saveCanvasElements(canvas, id)),
  };
};

export default connect(null, mapDispatchToProps)(CanvasControls);
