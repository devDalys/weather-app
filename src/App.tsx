import { Suspense } from "react";
import "./App.css";
import Home from "./components/Home";
import { CircularProgress } from "@mui/material";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <Home />
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
