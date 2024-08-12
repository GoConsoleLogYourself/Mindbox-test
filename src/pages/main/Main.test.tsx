import { render, screen, fireEvent } from "@testing-library/react";
import Main from "./Main";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { openModal } from "../../store/slices/ModalSlice";
import { RootState } from "../../store";

const mockStore = configureStore<RootState>([]);

describe("Тестирование компонента Main", () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      modal: { isOpen: false },
      todos: { todos: [] },
      todoType: {
        todoType: "All",
      },
    });

    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );
  });

  it("должен открывать модальное окно при клике на кнопку", () => {
    fireEvent.click(screen.getByRole("button", { name: /Add Todo/i }));
    const actions = store.getActions();
    expect(actions).toContainEqual(openModal());
  });

  it('должен отображать заголовок "ToDo List"', () => {
    expect(screen.getByText(/ToDo List/i)).toBeInTheDocument();
  });

  it('должен отображать одну кнопку "Add Todo"', () => {
    const buttons = screen.queryAllByText(/Add Todo/i);
    expect(buttons.length).toBe(3);
  });
});
