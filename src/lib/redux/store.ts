import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chats/chatSlice';
import userReducer from './users/userSlice';

export const store = configureStore({
  reducer: {
    chats: chatReducer,
    users: userReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch