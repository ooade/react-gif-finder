import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import gifs from './gifReducers';

const rootReducer = combineReducers({
  gifs,
  routing: routerReducer
});

export default rootReducer;
