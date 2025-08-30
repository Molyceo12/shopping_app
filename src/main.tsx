// src/main.tsx
import React from "react";
import './index.css';
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeStorage } from "./storage";

initializeStorage(); // create all tables in localStorage

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
