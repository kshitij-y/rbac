import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-left"
      toastOptions={{
        success: {
          style: {
            background: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#4CAF50",
          },
        },
        error: {
          style: {
            background: "#F44336",
            color: "#fff",
            fontWeight: "bold",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#F44336",
          },
        },
        duration: 2000,
      }}
    />
  </StrictMode>
);
