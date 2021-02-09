import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import pages from './pages';
import canvas from './canvas';
import bubbles from './bubbles';
import characters from './characters';
import user from './user';

const reducer = combineReducers({
  pages,
  canvas,
  bubbles,
  characters,
  user,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './pages';
export * from './canvas';
export * from './bubbles';
export * from './characters';
export * from './user'
