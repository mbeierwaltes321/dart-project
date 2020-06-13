import React, { Component, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { Button } from 'react-bootstrap';
import { random, inRange } from "lodash";
import { loadavg } from 'os';
import { createStore, combineReducers } from "redux";
import { action, CLEAR_BOARD, THROW_DARTS, clearBoard, throwDarts } from "./redux/actions";
import dartBoardReducer from "./redux/reducers"
import handleDarts from "./dartHandler";
import { get } from "lodash/fp";

const App = () => {


    /* useEffect - the function that is input is performed after the components mount.
    In other words, after everything loads, useEffect runs */

    const store = createStore(dartBoardReducer);

    // Functions needed after DOM is loaded - designs the board and disables the Reset button intially
    useEffect(store.getState().board.designDartBoard, [])
    useEffect(() => { disableButton("resetButton") }, []);

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

        await handleDarts(store.getState().board, "throw");
        store.dispatch(throwDarts);
        if (!store.getState().emptyBoard) {
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
        await handleDarts(store.getState().board, "remove");
        store.dispatch(clearBoard);
        if (store.getState().emptyBoard) {
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

            <div id="spaceForGuess"
                style={{
                    display: "inline-block",
                    marginTop: "40px",
                    position: "absolute",
                    width: "300px",
                    height: "200px",
                    background: "blue"
                }}>
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

export default App;