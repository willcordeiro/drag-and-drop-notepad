import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DragDropContext } from "react-beautiful-dnd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DragDropContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DragDropContext>
);
