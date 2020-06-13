
   // ****** REDUX ACTION MANAGEMENET ******
interface actionType {
    type: string,
    text: string,
}

// Redux action types -- May have to move into separate file in the future --
const CLEAR_BOARD_ACTION: string = "CLEAR_BOARD";
const THROW_DARTS_ACTION: string = "THROW_DARTS";

// Action objects
const clearBoardAction: actionType = {
    type: CLEAR_BOARD_ACTION,
    text: "Clears the board of darts and recreates the dart board"
}
const throwDartsAction: actionType = {
    type: THROW_DARTS_ACTION,
    text: "Throws darts onto the board and places them on the cavas"
}

export {actionType as action,
    CLEAR_BOARD_ACTION as CLEAR_BOARD,
    THROW_DARTS_ACTION as THROW_DARTS,
    clearBoardAction as clearBoard,
    throwDartsAction as throwDarts};
