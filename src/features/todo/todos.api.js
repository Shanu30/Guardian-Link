import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTodos = createAsyncThunk(
  "todos/allTodos",
  async () => {
    const response = await axios.get(`http://localhost:3000/data`);
    return response.data
  }
);

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodos",
    async (id) => {
        await axios.delete(`http://localhost:3000/data/${id}`);
        // console.log(id)
    }
  );
export const addTodo = createAsyncThunk(
    "todos/addTodos",
    async (payload) => {
        await axios.post(`http://localhost:3000/data/`,payload);
        // console.log(id)
    }
  );

