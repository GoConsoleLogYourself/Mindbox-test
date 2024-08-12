import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/index";
import Modal from "./Modal";

describe("Modal component", () => {
  beforeEach(() => {
    store.dispatch({ type: "modal/open" });
  });

  test("renders modal when isOpen is true", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );
    expect(screen.getByText(/Добавить новую задачу/i)).toBeInTheDocument();
  });

  test("displays error on blur if text field is empty", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    const textField = screen.getByLabelText(/Add todo.../i);
    fireEvent.blur(textField);
    expect(screen.getByLabelText(/Заполните это поле/i)).toBeInTheDocument();
  });

  test("does not allow adding empty todo", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    const button = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(button);
    expect(store.getState().todos.todos).toHaveLength(0);
  });

  test("allows adding a todo", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    const textField = screen.getByLabelText(/Add todo.../i);
    fireEvent.change(textField, { target: { value: "New Todo" } });

    const button = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(button);

    expect(store.getState().todos.todos).toHaveLength(1);
    expect(store.getState().todos.todos[0].text).toBe("New Todo");
  });

  test("closes modal on close button click", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    const closeButton = screen.getByTestId("close-btn");
    fireEvent.click(closeButton);

    expect(store.getState().modal.isOpen).toBe(false);
  });
});
