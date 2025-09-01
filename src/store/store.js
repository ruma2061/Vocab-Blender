import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vocabularyReducer from './slices/vocabularySlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vocabulary: vocabularyReducer,
    progress: progressReducer,
  },
});
