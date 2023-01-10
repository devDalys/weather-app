import * as React from "react";
import { Suspense } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30000,
        retry: false,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
          <Suspense>
            <Home />
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
