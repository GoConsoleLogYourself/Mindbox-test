import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../models/ITodo";

interface InitialStateProps {
  todos: ITodo[];
}
const initialState: InitialStateProps = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<ITodo[]>) {
      state.todos = state.todos.filter(
        todo => todo.completed === action.payload.includes(todo),
      );
    },
    toggleTodoCompleted(state, action: PayloadAction<string>) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload);
      toggledTodo!.completed = !toggledTodo!.completed;
    },
  },
});

export const { deleteTodo, addTodo, toggleTodoCompleted } = todoSlice.actions;
export default todoSlice.reducer;
