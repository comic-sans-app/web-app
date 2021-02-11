import Canvas from "./Canvas";
import { Container } from "react-bootstrap";

const CanvasControls = (props) => {
  return (
    <Container className="handle-canvas" fluid>
      <Canvas className="m-0" />
    </Container>
  );
};

export default CanvasControls;
