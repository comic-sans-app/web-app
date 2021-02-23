import React from "react";
import { connect } from "react-redux";
import { fabric } from "fabric";
import {
  Button,
  Dropdown,
  DropdownButton,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import "../../styles/canvas.css";
import { fourPanel, threePanel, sixPanel, removePanel } from "./Templates";
import { AddTextBox } from "./AddTextBox";
import { Circle } from "../Shapes/Circle";
import { Square } from "../Shapes/Square";
import Bubbles from "../TextBubbles/Bubbles";
import Characters from "../Characters/characters";
import { fetchCanvasElements, saveCanvasElements } from "../../store/canvas";
import ColorPicker from "../Editor/ColorPicker";
import CanvasControls from "./CanvasControls";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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

    // free drawing methods
    this.quickSave = this.quickSave.bind(this);
    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
  }

  componentDidMount() {
    this.setState({
      canvas: this.initCanvas(),
    });

    // will always load a fresh blank canvas, because this component mounts PRIOR to any user logging in or signing up
    this.props.loadCanvas(this.state.selectedCanvasId);
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

  initCanvas = () =>
    new fabric.Canvas("canvas", {
      //1:1 ratio
      height: windowHeightRatio,
      width: windowWidthRatio,
      backgroundColor: "white",
      isDrawingMode: false,
    });

  // same as save to store, but without notification functionality
  quickSave = (canvas, selectedCanvasId) => {
    this.props.saveCanvas(canvas.getObjects(), selectedCanvasId);
  };

  startDrawing(canvas, id) {
    this.quickSave(canvas, id);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    this.setState({
      canvas: canvas,
    });
  }

  stopDrawing(canvas, id) {
    canvas.isDrawingMode = false;
    this.quickSave(canvas, id);
    this.setState({
      canvas: canvas,
    });
  }

  render() {
    const canvasInstance = this.state.canvas;

    const colorPickerTooltip = (
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            select canvas elements you want to fill and pick your favorite color
          </Tooltip>
        }
      >
        <i className="fas fa-fill-drip"></i>
      </OverlayTrigger>
    );

    return (
      <div className="text-center">
        <Row>
          <Col lg={2} className="sidebar">
            {/* 'sidebar panel' */}
            {/* <div className="row"> */}
            <div>
              {/* Add to canvas buttons */}
              <div>
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
              </div>

              {/* color picker component buttons  */}
              <p className="m-2">Available colors {colorPickerTooltip}</p>
              <ColorPicker canvas={canvasInstance} />
            </div>
          </Col>

          <Col lg={10} className="canvas-col">
            {/* canvas column only */}
            <div className="d-flex flex-column justify-content-center">
              <Container className="overlay m-2" fluid>
                {/* This ternary toggles which button displays in the side container ("Start drawing" or "Stop drawing") depending upon the whether the user is currently in draw mode */}
                {!this.state.canvas.isDrawingMode ? (
                  <Button
                    className="button begin-draw-mode"
                    onClick={() =>
                      this.startDrawing(canvasInstance, this.selectedCanvasId)
                    }
                  >
                    Start drawing!
                  </Button>
                ) : (
                  <Button
                    className="button end-draw-mode"
                    onClick={() =>
                      this.stopDrawing(canvasInstance, this.selectedCanvasId)
                    }
                  >
                    Stop drawing!
                  </Button>
                )}

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

                <CanvasControls
                  canvasInstance={canvasInstance}
                  selectedCanvasId={this.state.selectedCanvasId}
                />
              </Container>
              <canvas id={`canvas`} width="300" height="300" />
            </div>
          </Col>
        </Row>
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
