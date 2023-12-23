
import { createSlice } from '@reduxjs/toolkit';

interface CorrectAnswersState {
  count: number;
}

const initialState: CorrectAnswersState = {
  count: 0,
};

const correctAnswersSlice = createSlice({
  name: 'correctAnswers',
  initialState,
  reducers: {
    incrementCorrectAnswers(state) {
      state.count += 1;
    },
    resetCorrectAnswers(state) {
      state.count = 0;
    },
  },
});

export const { incrementCorrectAnswers, resetCorrectAnswers } = correctAnswersSlice.actions;
export default correctAnswersSlice.reducer;
