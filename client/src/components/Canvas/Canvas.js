import React from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import {
  Button,
  Dropdown,
  DropdownButton,
  Container,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import '../../styles/canvas.css';
import { fourPanel, threePanel, sixPanel, removePanel } from './Templates';
//import { AddImage } from './AddImage';
//import { GithubPicker } from 'react-color';
import { AddTextBox } from './AddTextBox';
import { Circle } from '../Shapes/Circle';
import { Square } from '../Shapes/Square';
import Bubbles from '../TextBubbles/Bubbles';
import Characters from '../Characters/characters';
import { fetchCanvasElements, saveCanvasElements } from '../../store/index';
import ColorPicker from '../Editor/ColorPicker';
import { canvasControlsCopy } from './Copy';

let windowHeightRatio = Math.floor(0.7 * window.innerHeight);
let windowWidthRatio = Math.floor(0.85 * window.innerWidth);

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      canvas: {},
      selectedCanvasId: 'canvas',
    };

    //persisting bug I caused may be due to removing of items here...?
    this.initCanvas = this.initCanvas.bind(this);
    this.removeObject = this.removeObject.bind(this);
    this.save = this.save.bind(this);
    this.sendFront = this.sendFront.bind(this);
    this.sendBack = this.sendBack.bind(this);

    this.saveToStore = this.saveToStore.bind(this);
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

  // crossOrigin = anonymous before save needed
  save = () => {
    var canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
      // let downloadedImg = new Image(blob);
      // downloadedImg.crossOrigin = "Anonymous";
      // blob.crossOrigin = "Anonymous";
      saveAs(blob, 'comic.png');
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

  render() {
    const canvasInstance = this.state.canvas;

    return (
      <div className='text-center'>
        {/* color picker component buttons  */}
        <ColorPicker canvas={canvasInstance} />

        {/* Canvas controls */}

        {/* these buttons will be moved into their respective components */}
        <Container>
          <Button
            className='button add-to-canvas'
            onClick={() => Square(canvasInstance)}
          >
            <i className='fas fa-square-full'></i> Squares
          </Button>
          <Button
            className='button add-to-canvas'
            onClick={() => Circle(canvasInstance)}
          >
            <i className='fas fa-circle'></i> Circles
          </Button>
          <Button
            className='button add-to-canvas'
            onClick={() => AddTextBox(canvasInstance)}
          >
            <i className='fas fa-font'></i> Text
          </Button>

          {/* maybe turn it into a drop down with all images? */}
          {/* <Button
            className="btn btn-secondary"
            onClick={() => AddImage(canvasInstance)}
          >
            <i className='fas fa-image'></i> Images
          </Button> */}

          {/* dropdown menus */}
          <DropdownButton
            title='Templates'
            className='dropdown-button add-to-canvas'
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
        </Container>

        <Container className='d-flex justify-content-center m-2 pr-5' fluid>
          {/* send up just one layer */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.bringUpOne}</Tooltip>}
          >
            <Button
              variant='light'
              onClick={() => this.sendFrontOne(canvasInstance)}
            >
              <i class='fas fa-angle-up'></i>
            </Button>
          </OverlayTrigger>

          {/* send all the way to top layer */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.bringUp}</Tooltip>}
          >
            <Button
              variant='light'
              onClick={() => this.sendFront(canvasInstance)}
            >
              <i className='fas fa-angle-double-up'></i>
            </Button>
          </OverlayTrigger>

          {/* send down just one layer */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.bringDownOne}</Tooltip>}
          >
            <Button
              variant='light'
              onClick={() => this.sendBackOne(canvasInstance)}
            >
              <i class='fas fa-angle-down'></i>
            </Button>
          </OverlayTrigger>

          {/* send all the way to bottom layer */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.bringDown}</Tooltip>}
          >
            <Button
              variant='light'
              onClick={() => this.sendBack(canvasInstance)}
            >
              <i class='fas fa-angle-double-down'></i>
            </Button>
          </OverlayTrigger>

          {/* save to store button */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.save}</Tooltip>}
          >
            <Button
              variant='light'
              onClick={() =>
                this.saveToStore(canvasInstance, this.state.selectedCanvasId)
              }
            >
              <i className='far fa-save'></i>
            </Button>
          </OverlayTrigger>

          {/* download as image button */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.download}</Tooltip>}
          >
            <Button variant='light' onClick={() => this.save()}>
              <i className='fas fa-file-download'></i>
            </Button>
          </OverlayTrigger>

          {/* delete selected element(s) button */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.delete}</Tooltip>}
          >
            <Button
              variant='light'
              onClick={() => this.removeObject(canvasInstance)}
            >
              <i class='fas fa-eraser'></i>
            </Button>
          </OverlayTrigger>

          {/* delete selected element(s) button */}
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{canvasControlsCopy.clearCanvas}</Tooltip>}
          >
            <Button
              variant='outline-danger'
              onClick={() => this.clearCanvas(canvasInstance)}
            >
              <i className='far fa-trash-alt'></i>
            </Button>
          </OverlayTrigger>
        </Container>

        {/* <GithubPicker onChange={() => colorChange()}/> */}

        <canvas id={`canvas`} width='600' height='600' />
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
