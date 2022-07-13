import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {};
const enhancers = [];
const middlewares = [thunk];

//@todo: add redux dev tools

const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
