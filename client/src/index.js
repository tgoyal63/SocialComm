import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./Context/appContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
