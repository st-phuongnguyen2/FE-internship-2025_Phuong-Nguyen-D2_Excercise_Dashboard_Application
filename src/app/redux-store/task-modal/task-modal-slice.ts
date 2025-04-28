import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskFormFields } from '../../shared/schema-validations/task-form';
import { TaskFormTitle } from '../../utils/constants/task-form-title';

interface ITaskModalState {
  isOpen: boolean;
  taskForm?: ITaskFormFields;
  formTitle: TaskFormTitle;
}

const initialState = {
  isOpen: false,
  taskForm: undefined,
  formTitle: TaskFormTitle.ADD
} as ITaskModalState;

export const createUpdateTaskSlice = createSlice({
  name: 'createUpdateTask',
  initialState: initialState,
  reducers: {
    setTaskForm: (
      state,
      {
        payload
      }: PayloadAction<{
        isOpen: boolean;
        taskForm?: ITaskFormFields;
        formTitle?: TaskFormTitle;
      }>
    ) => {
      state.taskForm = payload.taskForm;
      state.formTitle = payload.formTitle || state.formTitle;
      state.isOpen = payload.isOpen;
    }
  }
});

export const { setTaskForm } = createUpdateTaskSlice.actions;

export const createUpdateTaskReducer = createUpdateTaskSlice.reducer;
