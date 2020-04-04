import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
// import loggingMiddleware from './middleware/logging';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) => {
  // const middleware = applyMiddleware(thunk, loggingMiddleware);
  // return createStore(rootReducer, initialState, middleware);
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
};

export default configureStore;
