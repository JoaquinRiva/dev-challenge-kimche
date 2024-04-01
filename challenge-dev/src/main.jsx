import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
//! REDUX
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { ApolloProvider } from "@apollo/client";
import client from './apolloClient'; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
