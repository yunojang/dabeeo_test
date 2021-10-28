import React from "react";
import ReactDOM from "react-dom";

import GlobalStyle from "style/GlobalStyle";

import App from "App";
import Header from "Components/Header";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById("root")
);
