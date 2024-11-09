import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
              console.log('ServiceWorker registration successful');
          })
          .catch(err => {
              console.log('ServiceWorker registration failed: ', err);
          });
  });
}

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
  >
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
