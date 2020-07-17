import DartBoard from "../data_strucs/dartBoard";
import { action, CLEAR_BOARD, CORRECT_CHOICE, INCORRECT_CHOICE } from "./actions";

// The dart board used for the state
const dartBoard: DartBoard = new DartBoard();

// ****** REDUX REDUCER MANAGEMENET ******
interface boardState {
    emptyBoard: boolean,
    board: DartBoard,
    userIsCorrect: boolean,
    userHasGuessed: boolean
}

const initialState: boardState = {
    emptyBoard: true,
    board: dartBoard,
    userIsCorrect: false,
    userHasGuessed: false
}

const checkDarts = (state: boardState, action: action) => {
    return dartBoard.isEmpty();
}

const returnUpdatedBoard = (state: boardState, action: action) => {
    return state.board
}

const updateCorrect = (state: boardState, action: action) => {
    switch (action.type) {
        case CORRECT_CHOICE:
            return true;
        case INCORRECT_CHOICE:
            return false;
        case CLEAR_BOARD:
            return false;
        default:
            return state.userIsCorrect;
    }
}

const updateGuessed = (state: boardState, action: action) => {
    switch (action.type) {
        case CORRECT_CHOICE:
            return true;
        case INCORRECT_CHOICE:
            return true;
        case CLEAR_BOARD:
            return false;
        default:
            return state.userIsCorrect;
        
    }

}

const dartBoardReducer = (state: boardState = initialState, action: action) => {
    return {
        emptyBoard: checkDarts(state, action),
        board: returnUpdatedBoard(state, action),
        userIsCorrect: updateCorrect(state, action),
        userHasGuessed: updateGuessed(state, action)
    }
}

export default dartBoardReducer;
export { boardState as stateType};