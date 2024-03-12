import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({ uri: "http://localhost:4000/" });

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink) as any,
  cache: new InMemoryCache(),
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  //  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
