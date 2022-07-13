import React from "react";
import { HomePage } from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <HomePage />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
