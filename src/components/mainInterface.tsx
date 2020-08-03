import React, { useEffect, FunctionComponent } from "react";
import { clearBoard, throwDarts } from "../Redux_Management/actions";
import { stateType } from "../Redux_Management/reducers";
import DecisionBoxes from "./decisionBoxes";
import handleDarts from "./dartHandler";
import { useSelector, useDispatch } from "react-redux";
import { board } from "../Redux_Management/reducers";

const MainInterface: FunctionComponent<any> = () => {

    // React-Redux selectors and dispatch
    const emptyBoard = useSelector( (state: stateType) => state.emptyBoard);
    const dispatch = useDispatch();

    // Functions needed after DOM is loaded - designs the board and disables the Reset button intially
    useEffect(board.designDartBoard, []);

    // Changes state of the guess/result box when emptyBoard changes
    useEffect(() => {
        if (!emptyBoard) {
            hideDecisionBox("guessBox", false);
        } else {
            hideDecisionBox("both", true);
        }
    }, [emptyBoard]);

    // Reveals or hides the guessbox depending on if darts were thrown
    const hideDecisionBox = (box: string, reveal: boolean) => {
        const guessBox = document.getElementById("guessBoard");
        if (!guessBox) {
            return;
        }

        const resultBox = document.getElementById("resultBox");
        if (!resultBox) {
            return;
        }

        switch (box) {
            case "guessBox":
                (guessBox as HTMLDivElement).hidden = reveal;
                break;
            case "resultBox":
                (resultBox as HTMLDivElement).hidden = reveal;
                break;
            case "both":
                (guessBox as HTMLDivElement).hidden = reveal;
                (resultBox as HTMLDivElement).hidden = reveal;
                break;
            default:
                return;
        }

    }

    // Throws darts and updates store
    const handleDartButtonClick = async () => {
        await handleDarts(board, "throw");
        dispatch(throwDarts());
    }

    // Resets board and updates store
    const handleResetButton = async () => {
        await handleDarts(board, "remove");
        dispatch(clearBoard());
    }

    return <div>
        {/* TODO - Eventually Redesign to make this title look better */}
        <h1 style={{marginLeft: "18px"}}>Darts Guessing Game</h1>
        <div style={{marginLeft: "20px"}}>
            <p>
                500 darts will be thrown at the dart board below. Guess
                which section of the dart board received the most amount of darts.
                If you pick the area with the most darts, you win!
            </p>
        </div>
        <div style={{ overflowX: "visible", whiteSpace: "nowrap" }}>

            {/* Canvas container for the dartboard and its darts */}
            <div style={{ position:"relative", display: "inline-block" }}>
                <canvas id="dartBoardOutline" width="400px" height="400px"
                    style={{
                        position: "absolute",
                        border: "3px solid rgb(201, 0, 0)",
                        marginTop: "20px",
                        marginBottom: "20px",
                        transform: "scale(0.9)"
                    }}>
                </canvas>
                <canvas id="darts" width="400px" height="400px"
                    style={{
                        position: "relative",
                        border: "3px solid rgb(201, 0, 0)",
                        marginTop: "20px",
                        marginBottom: "20px",
                        transform: "scale(0.9)"
                    }}>
                </canvas>
            </div>
            <div id="resultElements" style={{width:"300px", position: "absolute", display: "inline-block"}}>
                <div id="guessBoard" style={{position: "static"}} hidden={true} >
                    <DecisionBoxes board={board} />
                </div>
            </div>
        </div>

        {/* Empty div to separate the dartboard and the buttons */}

        {/* Throw Darts and Reset Buttons */}
        <div style={{ width: "350px", left: "25px", display: "inline-flex", position: "relative" }}>
            {/* This button will call ThrowDarts */}
            <button onClick={handleDartButtonClick}
                    disabled={!emptyBoard}
                    id="dartButton"
                    type="button"
                    className="btn btn-danger">
                Throw Darts
            </button>

            {/* Separates the two buttons */}
            <span style={{ flex: "auto" }} />

            {/* This button will reset the dart board */}
            <button onClick={handleResetButton}
                    disabled={emptyBoard}
                    id="resetButton"
                    type="button"
                    className="btn btn-danger">
                Reset
            </button>
        </div>

        {/* Chart containing the results of the dart throw */}
        

    </div>
};

export default MainInterface;