import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CategoryState {
  value: string;
}

const initialState: CategoryState = {
  value: "Sport",
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category.value;

export default categorySlice.reducer;
