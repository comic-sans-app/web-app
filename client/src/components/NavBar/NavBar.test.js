import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import store from "../../store/index";
import NavBar from "./NavBar";

let container = null;

// setting up a DOM element to render our test component into
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders NavBar component and displays proper Log In / Log Out CTA", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>,
      container
    );
  });

  const logInOrLogOutCTA = container.querySelector(".auth-button");
  expect(logInOrLogOutCTA.textContent).toBe("Log In or Sign Up");
});

// tear down method that unmounts our react component
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
