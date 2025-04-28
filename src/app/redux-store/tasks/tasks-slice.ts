import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../shared/models/Task';

interface ITasksState {
  tasks: Task[];
  selectedTaskId?: string;
}

const initialState = {
  tasks: [],
  selectedTaskId: undefined
} as ITasksState;

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<Task>) => {
      state.tasks.push(payload);
    },
    editTask: (state, { payload }: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.tasks[index] = payload;
      }
    },
    deleteTask: (state, { payload }: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((item) => item.id !== payload);
    },
    setSelectedTaskId: (state, { payload }: PayloadAction<string>) => {
      state.selectedTaskId = payload;
    }
  }
});

export const { addTask, editTask, deleteTask, setSelectedTaskId } =
  tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
