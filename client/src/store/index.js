import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import pages from "./pages";
import canvas from "./canvas";
import user from "./user";
import elements from "./elements";

const reducer = combineReducers({
  pages,
  canvas,
  user,
  elements,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./pages";
export * from "./canvas";
export * from "./user";
export * from "./elements";
