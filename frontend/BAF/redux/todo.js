import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  dataTodos: [],
};

export default createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setDataTodos: (state, action) => {
      state.dataTodos = action.payload;
    },
  },
});
