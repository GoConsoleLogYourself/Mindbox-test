import styles from "./todoList.module.scss";
import { Button, ButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { deleteTodo, toggleTodoCompleted } from "../../store/slices/toDoSlice";
import { setTodoType } from "../../store/slices/toDoTypeSlice";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useMemo } from "react";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { todos } = useAppSelector(state => state.todos);
  const { todoType } = useAppSelector(state => state.todoType);
  const onlyActiveTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );
  const onlyCompletedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );
  const handleChangeTodosArrays = useMemo(() => {
    if (todoType === "All") return todos;
    if (todoType === "Active") return onlyActiveTodos;
    if (todoType === "Completed") return onlyCompletedTodos;
    return todos;
  }, [todos, todoType, onlyActiveTodos, onlyCompletedTodos]);
  const handleDeleteCompletedTodos = () => {
    dispatch(deleteTodo(onlyCompletedTodos));
  };
  return (
    <main className={isMobile ? styles.todoListMobile : styles.todoList}>
      <ul className={styles.todos}>
        {handleChangeTodosArrays.length == 0 ? (
          <h2>Список задач пуст.</h2>
        ) : (
          handleChangeTodosArrays.map(todo => (
            <li
              className={
                todo.completed ? styles.completedTodo : styles.uncompletedTodo
              }
              onClick={() => dispatch(toggleTodoCompleted(todo.id))}
              key={todo.id}
            >
              {todo.text}
            </li>
          ))
        )}
      </ul>
      <div
        className={
          isMobile ? styles.bottomTodosInfoMobile : styles.bottomTodosInfo
        }
      >
        <p>Items left: {handleChangeTodosArrays.length}</p>
        <span>
          <ButtonGroup
            color="secondary"
            variant="outlined"
            aria-label="Small button group"
          >
            <Button
              onClick={() => dispatch(setTodoType("All"))}
              variant={todoType === "All" ? "contained" : "outlined"}
            >
              All
            </Button>
            <Button
              onClick={() => dispatch(setTodoType("Active"))}
              variant={todoType === "Active" ? "contained" : "outlined"}
            >
              Active
            </Button>
            <Button
              onClick={() => dispatch(setTodoType("Completed"))}
              variant={todoType === "Completed" ? "contained" : "outlined"}
            >
              Completed
            </Button>
          </ButtonGroup>
          <Button
            onClick={handleDeleteCompletedTodos}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Delete completed
          </Button>
        </span>
      </div>
    </main>
  );
};

export default TodoList;
