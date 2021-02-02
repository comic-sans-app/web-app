import React from 'react';
import { connect } from 'react-redux'
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import { Circle, redSquare } from '../Shapes/Circle';
import image from '../../assets/girls.jpg';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import '../../styles/canvas.css';
//import { GithubPicker } from 'react-color';
import { fetchCanvasElements, saveCanvasElements } from '../../store/index'
import canvas from '../../store/canvas';

let windowHeightRatio = Math.floor(0.85 * window.innerHeight);
let windowWidthRatio = Math.floor(0.85 * window.innerWidth);

class Canvas extends React.Component {
  // use after:render to save canvas state in store
  // use a timer to send ajax requests to save canvas into database (maybe in componentDidUpdate?)
  // we should be able to create a canvas with random id and set that id to celectedCanvasId when element is selected

  constructor() {
    super();
    this.state = {
      canvas: {},
      selectedCanvasId: 'canvas'
    };

    this.initCanvas = this.initCanvas.bind(this);
    this.afterRenderTest = this.afterRenderTest.bind(this);

    this.addSquare = this.addSquare.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.addImage = this.addImage.bind(this);

    this.removeObject = this.removeObject.bind(this);
    this.save = this.save.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.sendFront = this.sendFront.bind(this);
    this.sendBack = this.sendBack.bind(this);

    this.saveToStore = this.saveToStore.bind(this)
  }

  componentDidMount() {
    console.log('in componentDidMount');
    this.setState({
      canvas: this.initCanvas(),
    });
  }

  componentDidUpdate() {
    this.props.loadCanvas(this.state.canvas.getObjects(), this.state.selectedCanvasId)
    console.log('in componentDidUpdate!!!!!');
    //this.afterRenderTest(this.state.canvas);
  }

  afterRenderTest = (canvas) => {
    canvas.on('after:render', () => {
      console.log('after:render event');
    });
  };

  saveToStore = (canvas, selectedCanvasId) => {
    console.log('canvas loaded')
    this.props.saveCanvas(canvas.getObjects(), selectedCanvasId)
  }

  initCanvas = () =>
    new fabric.Canvas('canvas', {
      //1:1 ratio
      height: windowHeightRatio,
      width: windowWidthRatio,
      backgroundColor: 'white',
    });

  addSquare = (canvas) => {
    canvas.add(redSquare);
    // canvas.on('object:modified', () => {
    //   console.log('object:modified!');
    // });
    console.log(canvas.getObjects());
    // canvas.renderAll();
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
          onClick={() => this.saveToStore(this.state.canvas, this.state.selectedCanvasId)}
        >
          SAVE TO REDUX HELL YAH
        </Button>

        <ButtonToolbar>
          <ButtonGroup>
            <Button
              style={{ backgroundColor: 'green' }}
              onClick={() => this.colorChange('green', this.state.canvas)}
            ></Button>
            <Button
              style={{ backgroundColor: 'red' }}
              onClick={() => this.colorChange('red', this.state.canvas)}
            ></Button>
            <Button
              style={{ backgroundColor: 'blue' }}
              onClick={() => this.colorChange('blue', this.state.canvas)}
            ></Button>
            <Button
              style={{ backgroundColor: 'yellow' }}
              onClick={() => this.colorChange('yellow', this.state.canvas)}
            ></Button>
            <Button
              style={{ backgroundColor: 'purple' }}
              onClick={() => this.colorChange('purple', this.state.canvas)}
            ></Button>
            <Button
              style={{ backgroundColor: 'black' }}
              onClick={() => this.colorChange('black', this.state.canvas)}
            ></Button>
          </ButtonGroup>
        </ButtonToolbar>
        {/* <GithubPicker onChange={() => colorChange()}/> */}
        <canvas id={`canvas`} width="600" height="600" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { canvas: state.canvas }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCanvas: (canvas, id) => dispatch(fetchCanvasElements(canvas, id)),
    saveCanvas: (canvas, id) => dispatch(saveCanvasElements(canvas, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
