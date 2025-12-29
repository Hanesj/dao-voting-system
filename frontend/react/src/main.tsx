import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PollsProvider } from "./context/PollsContext.tsx";
import { SignalRProvider } from "./context/SignalRContext.tsx";
import WalletGate from "./components/WalletGate/WalletGate.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletGate>
      <PollsProvider>
        <SignalRProvider>
          <App />
        </SignalRProvider>
      </PollsProvider>
    </WalletGate>
  </StrictMode>
);
