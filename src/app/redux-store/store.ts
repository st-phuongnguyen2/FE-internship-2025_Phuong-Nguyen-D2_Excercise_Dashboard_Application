import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadingReducer } from './loading/loading-slice';
import { createUpdateTaskReducer } from './task-modal/task-modal-slice';

const combinedReducers = combineReducers({
  taskForm: createUpdateTaskReducer,
  loading: loadingReducer
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
