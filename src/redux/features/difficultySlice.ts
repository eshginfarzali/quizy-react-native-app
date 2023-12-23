import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface DifficultyState {
  value: string;
}

const initialState: DifficultyState = {
  value: "low",
};

export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setDifficulty } = difficultySlice.actions;

export const selectDifficulty = (state: RootState) => state.difficulty.value;

export default difficultySlice.reducer;
