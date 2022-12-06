import { Suspense } from 'react';
import './App.css'
import Home from "./components/Home";
import {CircularProgress} from "@mui/material";
import * as React from "react";

function App() {
    return (
        <div className="App">
            <Suspense>
                <Home/>
            </Suspense>
        </div>
    )
}

export default App
