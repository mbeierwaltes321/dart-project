import DartBoard from "../data_strucs/dartBoard";
import { action, CLEAR_BOARD, CORRECT_CHOICE, INCORRECT_CHOICE, THROW_DARTS } from "./actions";

// The dart board used for the state
const dartBoard: DartBoard = new DartBoard();

// ****** REDUX REDUCER MANAGEMENET ******
interface boardState {
    emptyBoard: boolean,
    userIsCorrect: boolean,
    userHasGuessed: boolean,
    boardData: sectionDataType[]
}

// Type used for boardData; used for boardData
interface sectionDataType {
    name: string,
    numberOfDarts: number
}

const initialState: boardState = {
    emptyBoard: true,
    userIsCorrect: false,
    userHasGuessed: false,
    boardData: [
        { name: "Section 1", numberOfDarts: 0 },
        { name: "Section 2", numberOfDarts: 0 },
        { name: "Section 3", numberOfDarts: 0 },
        { name: "Section 4", numberOfDarts: 0 },
        { name: "Section 5", numberOfDarts: 0 },
        { name: "Section 6", numberOfDarts: 0 }
    ]
}

const checkDarts = (state: boardState, action: action) => {
    return dartBoard.isEmpty();
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

const updateDarts = (state: boardState, action: action) => {
    switch (action.type) {
        case THROW_DARTS:
        case CLEAR_BOARD:
            const newBoardData: sectionDataType[] = [];
            for (let i = 1; i <= 6; i++) {
                newBoardData.push(
                    {
                        name: `Section ${i}`,
                        numberOfDarts: dartBoard.getDartsInSection(i)
                    }
                );
            }
            return newBoardData;
        default:
            return state.boardData;
    }
}

const dartBoardReducer = (state: boardState = initialState, action: action) => {
    return {
        emptyBoard: checkDarts(state, action),
        userIsCorrect: updateCorrect(state, action),
        userHasGuessed: updateGuessed(state, action),
        boardData: updateDarts(state, action)
    }
}

export default dartBoardReducer;
export { boardState as stateType, dartBoard as board };