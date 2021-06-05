import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import { moveLeft } from "./actions/boardActions";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./components/store";

window.addEventListener("DOMContentLoaded", () => {
  window.moveLeft = moveLeft;

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById("root")
  );
});
