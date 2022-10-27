import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DragDropContextProvider } from "./context/DragDropContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DragDropContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DragDropContextProvider>
);
