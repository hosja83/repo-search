import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*
    A router, which uses the history API (pushState, replaceState and the popstate
    event) to keep UI in sync with the URL. 
  */
  <BrowserRouter>
    <App />
  </BrowserRouter>
);