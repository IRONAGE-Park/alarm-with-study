import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
// React module

import App from "@renderer/alarm/App";
// components

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
