/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import UserSessionReducer from './slicers/UserSessionSlicer';
import LoadingReducer from './slicers/LoadingSlicer';

export default configureStore({
  reducer: {
    UserSession: UserSessionReducer,
    LoadingSlicer: LoadingReducer,
  },
});
