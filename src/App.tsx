import { Suspense } from "react";
import "./App.css";
import Home from "./components/Home";
import { CircularProgress } from "@mui/material";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense>
          <Home />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
