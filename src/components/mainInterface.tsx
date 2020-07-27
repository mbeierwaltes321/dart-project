import React, { useEffect, useCallback, FunctionComponent } from "react";
import { clearBoard, throwDarts, correctChoice, incorrectChoice } from "../Redux_Management/actions";
import { stateType } from "../Redux_Management/reducers";
import DecisionBoxes from "./decisionBoxes";
import handleDarts from "./dartHandler";
import { get } from "lodash/fp";
import { useSelector, useDispatch, useStore } from "react-redux";
import { board } from "../Redux_Management/reducers";

const MainInterface: FunctionComponent<any> = () => {

    // React-Redux selectors and dispatch
    const emptyBoard = useSelector( (state: stateType) => state.emptyBoard);
    const dispatch = useDispatch();
    // const theStore = useStore();

    /* useEffect - the function that is input is performed after the components mount.
    In other words, after everything loads, useEffect runs */

    // Functions needed after DOM is loaded - designs the board and disables the Reset button intially
    useEffect(board.designDartBoard, [])
    useEffect(() => { disableButton("resetButton") }, []);

    // Reveals or hides the guessbox depending on if darts were thrown
    const hideDecisionBox = useCallback((box: string, reveal: boolean) => {
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

    }, [])

    const disableButton = (buttonId: string) => {
        const buttonToDisable = document.getElementById(buttonId);
        if (!buttonToDisable) {
            return;
        }

        // Casting the button as an HTML Button Element
        (buttonToDisable as HTMLButtonElement).disabled = true;
    }

    const enableButton = (buttonId: string) => {
        const buttonToDisable = document.getElementById(buttonId);
        if (!buttonToDisable) {
            return;
        }

        (buttonToDisable as HTMLButtonElement).disabled = false;
    }

    /* Memoized - caches the result of the function and returns it when the same input returns again.
       useCallback returns a memoized callback that only changes if one of the dependencies (in the brackets)
       changes.
    */
    const handleDartButtonClick = useCallback(async (el) => {
        // This obtains the ID of the button element
        const id = get('target.id', el);
        if (!id) {
            return;
        }
        await handleDarts(board, "throw");
        dispatch(throwDarts());

        // ERROR - dispatch goes through, but the state variables aren't being updated
        if (!emptyBoard) {
            hideDecisionBox("guessBox", false);
            disableButton(id);
            enableButton("resetButton");
        }

    }, [])

    const handleResetButton = useCallback(async (el) => {

        // This obtains the ID of the button element
        const id = get('target.id', el);
        if (!id) {
            return;
        }

        // Waits for the darts to finish before updating the state
        await handleDarts(board, "remove");
        dispatch(clearBoard());
        if (emptyBoard) {
            hideDecisionBox("both", true);
            enableButton("dartButton");
            disableButton(id);
        }

    }, [])

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
            <button onClick={handleDartButtonClick} id="dartButton" type="button" className="btn btn-danger">
                Throw Darts
            </button>

            {/* Separates the two buttons */}
            <span style={{ flex: "auto" }} />

            {/* This button will reset the dart board */}
            <button onClick={handleResetButton} id="resetButton" type="button" className="btn btn-danger">
                Reset
            </button>
        </div>

    </div>

};



export default MainInterface;