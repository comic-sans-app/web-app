import React from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import image from '../../assets/girls.jpg';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import '../../styles/canvas.css';
import { fourPanel, threePanel, sixPanel } from './Templates';
//import { GithubPicker } from 'react-color';
import { fetchCanvasElements, saveCanvasElements } from '../../store/index';

let windowHeightRatio = Math.floor(0.85 * window.innerHeight);
let windowWidthRatio = Math.floor(0.85 * window.innerWidth);

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      canvas: {},
      selectedCanvasId: 'canvas',
    };

    this.initCanvas = this.initCanvas.bind(this);

    this.addSquare = this.addSquare.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.addImage = this.addImage.bind(this);

    this.removeObject = this.removeObject.bind(this);
    this.save = this.save.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.sendFront = this.sendFront.bind(this);
    this.sendBack = this.sendBack.bind(this);

    this.saveToStore = this.saveToStore.bind(this);
    this.addText = this.addText.bind(this);
  }

  componentDidMount() {
    this.setState({
      canvas: this.initCanvas(),
    });

    this.props.loadCanvas(this.state.selectedCanvasId);
  }

  updateCanvasWithFreshProps(canvas, canvasComingFromBE) {
    // this is made to ensure that all canvas elements stay on the screen
    // once the page refresh happens
    canvas.loadFromJSON(
      `{ "objects": ${JSON.stringify(canvasComingFromBE.elements)}}`
    );
  }

  componentDidUpdate(previousProps, previousState) {
    // here we're comparing what's coming from the backend vs what is cuerrently
    // displayed on the screen and saved in local component state
    if (previousProps.canvas.elements !== previousState.canvas._objects) {
      this.updateCanvasWithFreshProps(this.state.canvas, this.props.canvas);
    }
  }

  saveToStore = (canvas, selectedCanvasId) => {
    this.props.saveCanvas(canvas.getObjects(), selectedCanvasId);
  };

  initCanvas = () =>
    new fabric.Canvas('canvas', {
      //1:1 ratio
      height: windowHeightRatio,
      width: windowWidthRatio,
      backgroundColor: 'white',
    });

  addSquare = (canvas) => {
    const square = new fabric.Rect({
      height: 200,
      width: 200,
      fill: 'red',
    });
    canvas.add(square);
    canvas.renderAll();
  };

  save = () => {
    var canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
      saveAs(blob, 'comic.png');
    });
  };

  addCircle = (canvas) => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'blue',
      stroke: 'green',
      strokeWidth: 3,
    });
    canvas.add(circle);
    console.log(canvas.getObjects());
    // canvas.renderAll();
  };

  addImage = (canvas) => {
    // svgs will not work
    new fabric.Image.fromURL(image, function (img) {
      img.scale(0.1).set('flipX', true);
      canvas.add(img);
      console.log(canvas.getObjects());
      // canvas.renderAll();
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

  colorChange = (color, canvas) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.set({ fill: color });
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
  sendBack = (canvas) => {
    const activeObject = canvas.getActiveObjects();
    activeObject.forEach((object) => {
      object.sendToBack();
      canvas.renderAll();
    });
  };

  //KP: leave the add text as let bc with const I could not actually adjust the txt on click
  addText = (canvas) => {
    let text = new fabric.Textbox('Your text here...', {
      width: 300,
      height: 300,
      top: 5,
      left: 5,
      hasControls: true, //this lets you rotate the box/adjust sizing the way you can with shapes
      fontSize: 25,
      fontFamily: 'Verdana', //'Comic Sans MS'
    });

    canvas.add(text);
  };

  render() {
    return (
      <div className="col-md-12 text-center">
        <Button
          className="btn btn-secondary"
          onClick={() => this.addSquare(this.state.canvas)}
        >
          Add Square
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => this.addCircle(this.state.canvas)}
        >
          Add Circle
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => this.addImage(this.state.canvas)}
        >
          Add Image
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => this.addText(this.state.canvas)}
        >
          Add Text
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => this.removeObject(this.state.canvas)}
        >
          Remove Selected
        </Button>
        <Button className="btn btn-secondary" onClick={() => this.save()}>
          Save Image
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => this.sendFront(this.state.canvas)}
        >
          Front
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => this.sendBack(this.state.canvas)}
        >
          Back
        </Button>
        <Button
          onClick={() =>
            this.saveToStore(this.state.canvas, this.state.selectedCanvasId)
          }
        >
          SAVE TO REDUX
        </Button>

        <ButtonToolbar>
          <ButtonGroup>
            <Button
              className="color-picker-box"
              style={{ backgroundColor: 'green' }}
              onClick={() => this.colorChange('green', this.state.canvas)}
            ></Button>
            <Button
              className="color-picker-box"
              style={{ backgroundColor: 'red' }}
              onClick={() => this.colorChange('red', this.state.canvas)}
            ></Button>
            <Button
              className="color-picker-box"
              style={{ backgroundColor: 'blue' }}
              onClick={() => this.colorChange('blue', this.state.canvas)}
            ></Button>
            <Button
              className="color-picker-box"
              style={{ backgroundColor: 'yellow' }}
              onClick={() => this.colorChange('yellow', this.state.canvas)}
            ></Button>
            <Button
              className="color-picker-box"
              style={{ backgroundColor: 'purple' }}
              onClick={() => this.colorChange('purple', this.state.canvas)}
            ></Button>
            <Button
              className="color-picker-box"
              style={{ backgroundColor: 'black' }}
              onClick={() => this.colorChange('black', this.state.canvas)}
            ></Button>
          </ButtonGroup>
        </ButtonToolbar>
        <DropdownButton title="Templates" variant="secondary">
          <Dropdown.Item onSelect={() => threePanel(this.state.canvas)}>
            3 Panel
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => fourPanel(this.state.canvas)}>
            4 Panel
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => sixPanel(this.state.canvas)}>
            6 Panel
          </Dropdown.Item>
        </DropdownButton>
        {/* <GithubPicker onChange={() => colorChange()}/> */}
        <canvas id={`canvas`} width="600" height="600" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { canvas: state.canvas };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCanvas: (canvas, id) => dispatch(fetchCanvasElements(canvas, id)),
    saveCanvas: (canvas, id) => dispatch(saveCanvasElements(canvas, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
