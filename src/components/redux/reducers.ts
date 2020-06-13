import Dart from "./../Dart";
import DartBoard from "./../dartBoard"
import { action } from "./actions";

// The dart board used for the state
const dartBoard: DartBoard = new DartBoard();

// ****** REDUX MANAGEMENET ******
interface boardState {
    emptyBoard: boolean,
    board: DartBoard
}

const initialState: boardState = {
    emptyBoard: true,
    board: dartBoard
}

const checkDarts = (state: boardState, action: action) => {
    return dartBoard.isEmpty();
}

const returnUpdatedBoard = (state: boardState, action: action) => {
    return state.board
}

const dartBoardReducer = (state: boardState = initialState, action: action) => {
    return {
        emptyBoard: checkDarts(state, action),
        board: returnUpdatedBoard(state, action)
    }
}

export default dartBoardReducer;