import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
// import { ContextProvider } from './SocketContext';
import "./app/styles.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {MyProvider} from "./context/UserContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <MyProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MyProvider>,
);
