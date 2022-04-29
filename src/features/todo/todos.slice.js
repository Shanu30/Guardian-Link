import { createSlice } from "@reduxjs/toolkit";
import { getAllTodos } from "./todos.api";

const initialState = {
    isLoading:true,
    error:false,
    todos :[]
}
export const todosSlice = createSlice({
    name:'todos',
    initialState,
    reducers :{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodos.pending , (state,action) => {
                state.isLoading = true;
                state.todos = [];
                state.error = false;
            })
            .addCase(getAllTodos.fulfilled , (state,action) => {
                state.todos = action.payload;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(getAllTodos.rejected , (state,action) => {
                state.todos = action.payload;
                state.isLoading = false;
                state.error = true;
            })
    }
})

export default todosSlice.reducer;