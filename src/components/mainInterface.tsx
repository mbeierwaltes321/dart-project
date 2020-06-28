import React, { Component, useEffect, useCallback, ReactComponentElement, FunctionComponent } from "react";
import { clearBoard, throwDarts } from "./redux/actions";
import GuessBox from "./guessDartBox";
import handleDarts from "./dartHandler";
import { get } from "lodash/fp";

const MainInterface: FunctionComponent<{store: any}> = (props) => {

    /* useEffect - the function that is input is performed after the components mount.
    In other words, after everything loads, useEffect runs */

    // Functions needed after DOM is loaded - designs the board and disables the Reset button intially
    useEffect(props.store.getState().board.designDartBoard, [])
    useEffect(() => { disableButton("resetButton") }, []);

    // Reveals or hides the guessbox depending on if darts were thrown
    const handleGuessBox = useCallback((reveal: boolean) => {
        const guessBox = document.getElementById("guessBoardDivider");
        if (!guessBox) {
            return;
        }

        (guessBox as HTMLDivElement).hidden = reveal;

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

        await handleDarts(props.store.getState().board, "throw");
        props.store.dispatch(throwDarts);
        if (!props.store.getState().emptyBoard) {
            handleGuessBox(false);
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
        await handleDarts(props.store.getState().board, "remove");
        props.store.dispatch(clearBoard);
        if (props.store.getState().emptyBoard) {
            handleGuessBox(true);
            enableButton("dartButton");
            disableButton("resetButton");
        }

    }, [])

    return <div>
        {/* TODO - Eventually Redesign to make this title look better */}
        <h1>Darts Guessing Game</h1>
        <p>
            500 darts will be thrown at the dart board below. Guess
            which section of the dart board received the most amount of darts.
            If you pick the area with the most darts, you win!
        </p>
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>

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
            <div id="guessBoardDivider" style={{position: "absolute", display: "inline-block"}} hidden={true}>
                <GuessBox emptyBoard={props.store.getState().emptyBoard} board={props.store.getState().board}/>
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