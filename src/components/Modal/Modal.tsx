import styles from "./modal.module.scss";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { closeModal } from "../../store/slices/ModalSlice";
import useClickOutside from "../../hooks/useClickOutsude";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addTodo } from "../../store/slices/toDoSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.modal);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => dispatch(closeModal()));
  const [todoText, setTodoText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const handleAddTodo = () => {
    if (todoText !== "") {
      dispatch(
        addTodo({
          id: new Date().toISOString(),
          text: todoText,
          completed: false,
        }),
      );
    }
    setTodoText("");
  };
  const handleOnBlurError = () => {
    if (todoText === "") {
      setError(true);
    }
    if (todoText !== "") {
      setError(false);
    }
  };
  return (
    <div className={isOpen ? styles.modal : styles.none}>
      <div className={styles.container} ref={modalRef}>
        <h1>Добавить новую задачу.</h1>
        <form>
          <TextField
            id="outlined-basic"
            label={error ? "Заполните это поле" : "Add todo..."}
            variant="outlined"
            color="secondary"
            value={todoText}
            onChange={e => setTodoText(e.target.value)}
            size="small"
            error={error}
            onBlur={handleOnBlurError}
          />
          <Button
            onClick={handleAddTodo}
            variant="contained"
            color="secondary"
            disabled={todoText === "" ? true : false}
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </form>
        <div
        data-testid="close-btn"
          onClick={() => dispatch(closeModal())}
          className={styles.close}
        ></div>
      </div>
    </div>
  );
};

export default Modal;
