import Canvas from "./Canvas";
import { Container } from "react-bootstrap";

const CanvasControls = (props) => {
  return (
    <Container className="handle-canvas" fluid>
      <Canvas className="m-0" />
      <div className="col-md-12 text-center">
        {/* <Button className="btn btn-secondary" variant="primary" size="sm">
          Clear page
        </Button>
        <Button className="btn btn-secondary" variant="primary" size="sm">
          Add new page
        </Button> */}
      </div>
    </Container>
  );
};

export default CanvasControls;
