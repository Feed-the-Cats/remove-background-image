import React from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
//import { DropContextProvider } from "./dropContext/dropContext.stsx";
// import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/* ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
); */
