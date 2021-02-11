import React from "react";
import { connect } from "react-redux";
import { fabric } from "fabric";
import { saveAs } from "file-saver";
import {
  Button,
  Dropdown,
  DropdownButton,
  Tooltip,
  OverlayTrigger,
  Container,
} from "react-bootstrap";
import "../../styles/canvas.css";
import { fourPanel, threePanel, sixPanel, removePanel } from "./Templates";
import { AddTextBox } from "./AddTextBox";
import { Circle } from "../Shapes/Circle";
import { Square } from "../Shapes/Square";
import Bubbles from "../TextBubbles/Bubbles";
import Characters from "../Characters/characters";
import { fetchCanvasElements, saveCanvasElements } from "../../store/index";
import ColorPicker from "../Editor/ColorPicker";
import { canvasControlsCopy } from "./Copy";

let windowHeightRatio = Math.floor(0.7 * window.innerHeight);
let windowWidthRatio = Math.floor(0.7 * window.innerWidth);

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      canvas: {},
      selectedCanvasId: "canvas",
    };

    this.initCanvas = this.initCanvas.bind(this);
    this.removeObject = this.removeObject.bind(this);
    this.save = this.save.bind(this);
    this.sendFront = this.sendFront.bind(this);
    this.sendBack = this.sendBack.bind(this);
    this.saveToStore = this.saveToStore.bind(this);

    this.createEventListener = this.createEventListener.bind(this);
    this.deleteWithKeyboard = this.deleteWithKeyboard.bind(this);
  }

  componentDidMount() {
    this.setState({
      canvas: this.initCanvas(),
    });

    this.props.loadCanvas(this.state.selectedCanvasId);
    // will always load a fresh blank canvas, because this component mounts PRIOR to any user logging in or signing up

    this.createEventListener();
  }

  updateCanvasWithFreshProps(canvas, jsonString) {
    canvas.loadFromJSON(jsonString);
  }

  componentDidUpdate() {
    if (
      this.props.user.userName &&
      this.state.selectedCanvasId !== this.props.user.userName
    ) {
      // if we have loaded something onto the user prop AND we have not yet set the selectedCanvasId on state to be that userName
      this.props.loadCanvas(this.props.user.userName);
      this.setState({
        selectedCanvasId: this.props.user.userName,
      });
    }

    if (this.props.canvas.elements) {
      const canvasElementsFromDatabase = this.props.canvas.elements;
      let jsonString = JSON.stringify(canvasElementsFromDatabase);
      jsonString = `{ "objects": ` + jsonString + `}`;
      this.updateCanvasWithFreshProps(this.state.canvas, jsonString);
    }
  }

  saveToStore = (canvas, selectedCanvasId) => {
    this.props.saveCanvas(canvas.getObjects(), selectedCanvasId);
  };

  initCanvas = () =>
    new fabric.Canvas("canvas", {
      //1:1 ratio
      height: windowHeightRatio,
      width: windowWidthRatio,
      backgroundColor: "white",
    });

  // crossOrigin = anonymous before save needed
  save = () => {
    var canvas = document.getElementById("canvas");
    canvas.toBlob(function (blob) {
      // let downloadedImg = new Image(blob);
      // downloadedImg.crossOrigin = "Anonymous";
      // blob.crossOrigin = "Anonymous";
      saveAs(blob, "comic.png");
      // saveAs(downloadedImg, 'comic.png');
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
    if (event.key === "Backspace" || event.key === "Delete") {
      this.removeObject(this.state.canvas);
    }
  }

  render() {
    const canvasInstance = this.state.canvas;
    return (
      <div className="text-center">
        {/* 'sidebar panel' */}
        <div className="row">
          <div className="col-2">
            {/* Canvas controls */}
            {/* color picker component buttons  */}
            <ColorPicker canvas={canvasInstance} />

            <Button
              className="button add-to-canvas"
              onClick={() => Square(canvasInstance)}
            >
              Add <i className="fas fa-square-full"></i>
            </Button>
            <Button
              className="button add-to-canvas"
              onClick={() => Circle(canvasInstance)}
            >
              Add <i className="fas fa-circle"></i>
            </Button>
            <Button
              className="button add-to-canvas"
              onClick={() => AddTextBox(canvasInstance)}
            >
              <i className="fas fa-font"></i> Text
            </Button>
            {/* dropdown menus */}
            <DropdownButton
              title="Templates"
              className="dropdown-button add-to-canvas"
            >
              <Dropdown.Item onSelect={() => threePanel(canvasInstance)}>
                3 Panel
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => fourPanel(canvasInstance)}>
                4 Panel
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => sixPanel(canvasInstance)}>
                6 Panel
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => removePanel(canvasInstance)}>
                Remove All
              </Dropdown.Item>
            </DropdownButton>

            <Characters canvasInstance={canvasInstance} />
            <Bubbles canvasInstance={canvasInstance} />
          </div>

          {/* canvas column only */}
          <div className="col-10">
            <Container className="overlay">
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

              {/* send all the way to bottom layer */}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{canvasControlsCopy.bringDown}</Tooltip>}
              >
                <Button
                  variant="light"
                  onClick={() => this.sendBack(canvasInstance)}
                >
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
                  onClick={() =>
                    this.saveToStore(
                      canvasInstance,
                      this.state.selectedCanvasId
                    )
                  }
                >
                  <i className="far fa-save"></i>
                </Button>
              </OverlayTrigger>

              {/* download as image button */}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{canvasControlsCopy.download}</Tooltip>}
              >
                <Button variant="light" onClick={() => this.save()}>
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
            </Container>
            <canvas id={`canvas`} width="300" height="300" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { canvas: state.canvas, user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCanvas: (id) => dispatch(fetchCanvasElements(id)),
    saveCanvas: (canvas, id) => dispatch(saveCanvasElements(canvas, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
