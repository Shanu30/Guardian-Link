import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todo/todos.slice';

export const store = configureStore({
  reducer: {
    todos:todosReducer
  },
});
