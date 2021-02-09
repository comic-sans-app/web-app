import React from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import {
  Button,
  Dropdown,
  DropdownButton,
  Container
} from 'react-bootstrap';
import '../../styles/canvas.css';
import { fourPanel, threePanel, sixPanel } from './Templates';
import { AddImage } from './AddImage';
//import { GithubPicker } from 'react-color';
import { AddTextBox } from './AddTextBox';
import { Circle } from '../Shapes/Circle';
import { Square } from '../Shapes/Square';
import Bubbles from '../TextBubbles/Bubbles';
import Characters from '../Characters/characters';
import { fetchCanvasElements, saveCanvasElements } from '../../store/index';
import  ColorPicker  from '../Editor/ColorPicker'

let windowHeightRatio = Math.floor(0.70 * window.innerHeight);
let windowWidthRatio = Math.floor(0.70 * window.innerWidth);

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


  save = () => {
    var canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
      saveAs(blob, 'comic.png');
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
      <div className="text-center">

        {/* color picker component buttons  */}
        <ColorPicker canvas={this.state.canvas} />

        {/* Canvas controls */}
        {/* these buttons will be moved into their respective components */}
        <Container>
        <DropdownButton title="Templates" variant="secondary" className="dropdown-button"> 
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

          <Button
            className="btn btn-secondary"
            onClick={() => Square(this.state.canvas)}
          >
          <i className="fas fa-square-full"></i> Squares
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => Circle(this.state.canvas)}
          >
          <i className="fas fa-circle"></i> Circles
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => AddTextBox(this.state.canvas)}
          >
            <i className='fas fa-font'></i> Text
          </Button>

          {/* maybe turn it into a drop down with all images? */}
          <Button
            className="btn btn-secondary"
            onClick={() => AddImage(this.state.canvas)}
          >
            <i className='fas fa-image'></i> Images
          </Button>
            <Characters />
            <Bubbles />
            </Container>

        <Container className='d-flex justify-content-center m-2 pr-5' fluid>
          {/* send all the way to top layer */}
          <Button
            variant='light'
            onClick={() => this.sendFront(this.state.canvas)}
          >
            <i className="fas fa-angle-double-up"></i>
          </Button>

          {/* send all the way to bottom layer */}
          <Button
            variant='light'
            onClick={() => this.sendBack(this.state.canvas)}
          >
            <i className="fas fa-angle-double-down"></i>
          </Button>

          {/* save to store button */}
          <Button
            variant='light'
            onClick={() =>
              this.saveToStore(this.state.canvas, this.state.selectedCanvasId)
            }
          >
            <i className="far fa-save"></i>
          </Button>

          {/* download as image button */}
          <Button
            variant='light'
            onClick={() => this.save()}
          >
            <i className="fas fa-file-download"></i>
          </Button>

          {/* delete selected element(s) button */}
          <Button
            variant='light'
            onClick={() => this.removeObject(this.state.canvas)}
          >
            <i className="far fa-trash-alt"></i>
          </Button>

        </Container>

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
