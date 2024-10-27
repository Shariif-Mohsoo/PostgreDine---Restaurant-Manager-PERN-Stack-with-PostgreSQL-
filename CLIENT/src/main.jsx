import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import App from "./App";
import { RestaurantContextProvider } from "./context/RestaurantContexts";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
  <StrictMode>
    <RestaurantContextProvider>
      <App />
    </RestaurantContextProvider>
  </StrictMode>
);
