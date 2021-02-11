import React from "react";
import ReactDOM from "react-dom";
import "./styles/App.css";
import "./styles/main.css";
import App from "./components/App";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components/Home";

const routing = (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/editor" component={App} />
        </div>
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById("root"));
