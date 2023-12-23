import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './features/categorySlice'; 
import difficultyReducer from './features/difficultySlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    difficulty: difficultyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


