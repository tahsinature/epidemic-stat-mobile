import {combineReducers} from 'redux';
import profileReducer from './profileReducer';
import appReducer from './appReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  appReducer,
  profileReducer,
  homeReducer,
});

export default rootReducer;
