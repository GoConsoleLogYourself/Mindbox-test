import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, Store } from "redux";
import TodoList from "./TodoList";
import { rootReducer } from "../../store/index";
import { ITodo } from "../../models/ITodo";

interface RootState {
  todos: {
    todos: ITodo[];
  };
  todoTypes: {
    todoType: string;
  };
}

const renderWithRedux = (
  component: React.ReactNode,
  { initialState, store }: { initialState?: RootState; store?: Store } = {},
) => {
  const reduxStore = store || createStore(rootReducer, initialState);
  return render(<Provider store={reduxStore}>{component}</Provider>);
};

describe("TodoList Component", () => {
  it("renders empty message when there are no todos", () => {
    renderWithRedux(<TodoList />, {
      initialState: { todos: { todos: [] }, todoTypes: { todoType: "All" } },
    });

    expect(screen.getByText(/Список задач пуст/i)).toBeInTheDocument();
  });

  it("renders todos when they are present", () => {
    const todos = [{ id: "1", text: "Test Todo 1", completed: false }];
    renderWithRedux(<TodoList />, {
      initialState: { todos: { todos }, todoTypes: { todoType: "All" } },
    });

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
  });

  it("toggles todo completion state", () => {
    const todos = [{ id: "1", text: "Test Todo 1", completed: false }];
    const { getByText } = renderWithRedux(<TodoList />, {
      initialState: { todos: { todos }, todoTypes: { todoType: "All" } },
    });

    fireEvent.click(getByText("Test Todo 1"));
    expect(getByText("Test Todo 1")).toHaveClass("completedTodo");
  });

  it("deletes completed todos", () => {
    const todos = [
      { id: "1", text: "Test Todo 1", completed: true },
      { id: "2", text: "Test Todo 2", completed: false },
    ];

    const { getByText, queryByText } = renderWithRedux(<TodoList />, {
      initialState: { todos: { todos }, todoTypes: { todoType: "All" } },
    });

    fireEvent.click(getByText("Delete completed"));
    expect(queryByText("Test Todo 1")).not.toBeInTheDocument();
    expect(getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("filters todos based on selected type", () => {
    const todos = [
      { id: "1", text: "Todo 1", completed: false },
      { id: "2", text: "Todo 2", completed: true },
    ];

    renderWithRedux(<TodoList />, {
      initialState: { todos: { todos }, todoTypes: { todoType: "All" } },
    });

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Completed"));

    expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });
});
