import React from "react";
import ReactDOM from "react-dom";
import CanvasControls from "./CanvasControls";
import { unmountComponentAtNode } from "react-dom";

let container = null;

// setting up a DOM element to render our test component into
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders CanvasControls component", () => {
  ReactDOM.render(<CanvasControls />, container);
});

// tear down method that unmounts our react component
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
