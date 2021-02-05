import  Canvas  from './Canvas';
// import { Button } from 'react-bootstrap';

const CanvasControls = (props) => {
  return (
    <div className="handle-canvas">
      <Canvas className='m-3'/>
      <div className="col-md-12 text-center">
        {/* <Button className="btn btn-secondary" variant="primary" size="sm">
          Clear page
        </Button>
        <Button className="btn btn-secondary" variant="primary" size="sm">
          Add new page
        </Button> */}
      </div>
    </div>
  );
};

export default CanvasControls;
