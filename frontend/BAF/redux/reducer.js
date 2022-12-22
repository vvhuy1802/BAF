import { combineReducers } from '@reduxjs/toolkit';
import todo from './todo';
const rootReducer = combineReducers({
  todo: todo,
});

export default rootReducer;
