/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

export const LoadingSlicer = createSlice({
  name: 'LoadingSlice',
  initialState: {
    value: {
      loading: false,
      loadingMessage: '',
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.value.loading = true;
      state.value.loadingMessage = action.payload;
    },
    setUnLoading: (state, action) => {
      state.value.loading = false;
      state.value.loadingMessage = '';
    },
  },
});

export const {
    setLoading,
    setUnLoading,
  } = LoadingSlicer.actions;
  export default LoadingSlicer.reducer;
