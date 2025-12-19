import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PollsProvider } from "./context/PollsContext.tsx";
import { SignalRProvider } from "./context/SignalRContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PollsProvider>
      <SignalRProvider>
        <App />
      </SignalRProvider>
    </PollsProvider>
  </StrictMode>
);
