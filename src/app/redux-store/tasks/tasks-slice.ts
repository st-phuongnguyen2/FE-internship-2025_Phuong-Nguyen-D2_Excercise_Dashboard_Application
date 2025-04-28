import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../shared/models/Task';

interface ITasksState {
  tasks: Task[];
}

const initialState = {
  tasks: []
} as ITasksState;

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<Task>) => {
      state.tasks.push(payload);
    }
  }
});

export const { addTask } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
