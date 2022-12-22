import {configureStore} from '@reduxjs/toolkit';

import todo from './todo';

const store = configureStore({
  reducer: {
    todo: todo.reducer,
  },
});

export default store;
