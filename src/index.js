import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import Home from './pages/Home'
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Home />
  </React.StrictMode>
);
