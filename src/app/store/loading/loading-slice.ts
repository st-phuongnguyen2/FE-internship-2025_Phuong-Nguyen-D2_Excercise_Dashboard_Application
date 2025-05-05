import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isLoading: boolean;
}

const initialState = {
  isLoading: true
} as ILoadingState;

export const loadingSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    }
  }
});

export const { setLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
