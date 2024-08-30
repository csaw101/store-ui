import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./index.css";

const client = new ApolloClient({
  // uri: "https://scandi-test.com",
  uri: "https://scanditest.alwaysdata.net/backend/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
