import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "regenerator-runtime/runtime";
import { ThemeProvider } from "./components/theme-provider.tsx";
// import { inter } from "./fonts/fonts.ts";
import Layout from "./components/layout/Layout.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Layout>
          <App />
        </Layout>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
