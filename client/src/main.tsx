import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { OnboardingProvider } from "./hooks/use-onboarding";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <OnboardingProvider>
      <App />
    </OnboardingProvider>
  </QueryClientProvider>,
);
