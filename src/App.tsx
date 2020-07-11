import React from "react";
import MainInterface from "./components/mainInterface";
import { createStore } from "redux";
import dartBoardReducer from "./Redux_Management/reducers"
import { composeWithDevTools } from "redux-devtools-extension";

// composeWithDevTools is used for the redux Chrome extension
const store = createStore(dartBoardReducer, composeWithDevTools());

const App = () => {
    return <div>
        <MainInterface store={store}/>
    </div>
}

export default App;