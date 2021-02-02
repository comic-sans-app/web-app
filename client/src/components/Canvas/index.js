import  Canvas  from './Canvas';
import { Button } from 'react-bootstrap';

const CanvasControls = (props) => {
  return (
    <div>
      <Canvas className='m-3'/>
      <div className="col-md-12 text-center">
        <Button variant="primary" size="sm">
          Clear page
        </Button>
        <Button variant="primary" size="sm">
          Add new page
        </Button>
      </div>
    </div>
  );
};

export default CanvasControls;
