import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoType } from "../../models/iTodoType";

interface InitialStateProps {
  todoType: ITodoType;
}
const initialState: InitialStateProps = {
  todoType: "All",
};

const todoTypeSlice = createSlice({
  name: "todoType",
  initialState,
  reducers: {
    setTodoType(state, action: PayloadAction<ITodoType>) {
      state.todoType = action.payload;
    },
  },
});

export const { setTodoType } = todoTypeSlice.actions;
export default todoTypeSlice.reducer;
