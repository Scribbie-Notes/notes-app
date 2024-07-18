import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
  >
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
