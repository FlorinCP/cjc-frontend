import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./app/styles.css";
import { store , persistor} from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CircularLoadingAnimation from "./components/LoadingAnimations/CircularLoadingAnimation";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={<CircularLoadingAnimation/>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
