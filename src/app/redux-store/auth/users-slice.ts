import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../shared/models/User';

interface IAuthState {
  currentUser?: User;
}

const initialState = {
  currentUser: undefined
} as IAuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    logout: (state) => {
      state.currentUser = undefined;
    }
  }
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
