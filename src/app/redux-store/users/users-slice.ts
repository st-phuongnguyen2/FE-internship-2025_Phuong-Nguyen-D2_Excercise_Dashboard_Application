import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../shared/models/User';

interface IUsersState {
  users: User[];
  currentUser?: User;
}

const initialState = {
  users: [],
  currentUser: undefined
} as IUsersState;

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users.push(payload);
    },
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    }
  }
});

export const { addUser, setCurrentUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
