import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/users-slice';
import { loadingReducer } from './loading/loading-slice';
import { usersReducer } from './users/users-slice';

const usersPersistConfig = {
  key: 'users',
  version: 1,
  storage: storage
};

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage: storage
};

const combinedReducers = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  loading: loadingReducer
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
