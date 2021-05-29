import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./components/store";
import { moveLeft } from "./actions/boardActions";

window.addEventListener("DOMContentLoaded", () => {
  window.moveLeft = moveLeft;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
