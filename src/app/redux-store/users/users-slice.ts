import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../shared/models/User';

interface IUsersState {
  users: User[];
}

const initialState = {
  users: []
} as IUsersState;

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users.push(payload);
    }
  }
});

export const { addUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
