import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vocabularyReducer from './slices/vocabularySlice';
import progressReducer from './slices/progressSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vocabulary: vocabularyReducer,
    progress: progressReducer,
    language: languageReducer,
  },
});
