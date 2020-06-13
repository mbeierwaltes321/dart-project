import Dart from "./../Dart";
import DartBoard from "./../dartBoard"
import { action } from "./actions";

// The dart board used for the state

// TODO - See if it's possible to initialize dartBoard in App.tsx without
// and allowing state to continue
const dartBoard: DartBoard = new DartBoard();

// ****** REDUX MANAGEMENET ******
interface boardState {
    emptyBoard: boolean,
    allDarts: Dart[]
}

const initialState: boardState = {
    emptyBoard: true,
    allDarts: []
}

const checkDarts = (state: boardState, action: action) => {
    return dartBoard.isEmpty();
}

const handleDartsTEMP = (state: boardState, action: action) => {
    return dartBoard.getDarts;
}

const dartBoardReducer = (state: boardState = initialState, action: action) => {
    return {
        emptyBoard: checkDarts(state, action),
        allDarts: handleDartsTEMP(state, action)
    }
}

export default dartBoardReducer;
export { dartBoard };