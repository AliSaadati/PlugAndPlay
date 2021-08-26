import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import allReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;