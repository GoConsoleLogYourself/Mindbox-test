import styles from "./main.module.scss";
import { useAppDispatch } from "../../hooks/typedReduxHooks";
import Modal from "../../components/Modal/Modal";
import { openModal } from "../../store/slices/ModalSlice";
import TodoList from "../../components/TodoList/TodoList";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Main() {
  const dispatch = useAppDispatch();
  return (
    <main className={styles.main}>
      <h1 className={styles.todoHeader}>ToDo List</h1>
      <section className={styles.todoContainer}>
        <Button
          onClick={() => dispatch(openModal())}
          variant="contained"
          color="secondary"
          endIcon={<AddIcon />}
          sx={{ width: "150px", height: "40px" }}
        >
          Add Todo
        </Button>
        <TodoList />
      </section>
      <Modal />
    </main>
  );
}

export default Main;
