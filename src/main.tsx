import ReactDOM from "react-dom/client";
import Main from "./pages/main/Main.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading/Loading.tsx";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Suspense fallback={<Loading />}>
        <Main />
      </Suspense>
    </PersistGate>
  </Provider>,
);
