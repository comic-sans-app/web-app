import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import store from "../../store/index";
import CanvasControls from "./CanvasControls";

let container = null;

// setting up a DOM element to render our test component into
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders CanvasControls component", () => {
  ReactDOM.render(
    <Provider store={store}>
      <CanvasControls />
    </Provider>,
    container
  );
});

// tear down method that unmounts our react component
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
