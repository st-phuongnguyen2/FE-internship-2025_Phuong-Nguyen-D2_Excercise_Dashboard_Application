import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskFormFields } from '../../shared/schema-validations/task-form';
import { TaskFormTitle } from '@src/app/core/constants/task-form-title';

interface ITaskModalState {
  isOpen: boolean;
  taskForm?: ITaskFormFields;
  formTitle: TaskFormTitle;
  taskId?: string;
  onSuccess?: () => void;
}

const initialState = {
  isOpen: false,
  taskForm: undefined,
  formTitle: TaskFormTitle.ADD,
  taskId: undefined,
  onSuccess: undefined
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
        taskId?: string;
        onSuccess?: () => void;
      }>
    ) => {
      state.taskForm = payload.taskForm;
      state.formTitle = payload.formTitle || state.formTitle;
      state.isOpen = payload.isOpen;
      state.taskId = payload.taskId;
      state.onSuccess = payload.onSuccess;
    },
    resetTaskForm(state) {
      state.taskForm = undefined;
      state.formTitle = TaskFormTitle.ADD;
      state.isOpen = false;
      state.taskId = undefined;
      state.onSuccess = undefined;
    }
  }
});

export const { setTaskForm, resetTaskForm } = createUpdateTaskSlice.actions;

export const createUpdateTaskReducer = createUpdateTaskSlice.reducer;
