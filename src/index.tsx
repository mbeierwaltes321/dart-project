import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore, compose } from "redux";
import { Provider } from "react-redux";

import dartBoardReducer from "./Redux_Management/reducers"
import { composeWithDevTools } from "redux-devtools-extension";

//TODO - Rewrite project to work with React-Redux
// When that is done, rework the file directory to
// work with components and containers

const store = createStore(dartBoardReducer, composeWithDevTools());

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById("app"));