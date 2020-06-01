import React, { Component, useEffect, useCallback } from "react";
import Redux from "redux";
import ReactDOM from "react-dom";
import { Button } from 'react-bootstrap';
import { random, inRange } from "lodash";
import { loadavg } from 'os';
import handleDarts from "./dartHandler"
import DartBoard from "./dartBoard";
import { get } from "lodash/fp"
import Dart from "./Dart"

const App = () => {

    interface boardState {
        emptyBoard: boolean,
        darts: Dart[]
    }

    interface actionType {
        type: string,
        text: string,
    }

    // Redux action types -- May have to move into separate file in the future --
    const CLEAR_BOARD: string = "CLEAR_BOARD";
    const THROW_DARTS: string = "THROW_DARTS";

    // Action objects
    const clearBoard: actionType = {
        type: CLEAR_BOARD,
        text: "Clears the board of darts and recreates the dart board"
    }
    const throwDarts: actionType = {
        type: THROW_DARTS,
        text: "Throws darts onto the board and places them on the cavas"
    }

    // State variables
    let isEmpty: boolean = true;
    let theDarts: Dart[] = [];

    const initialState: boardState = {
        emptyBoard: isEmpty,
        darts: theDarts
    }

    // Reducer
    const changeDartBoard = (state: boardState, action: actionType) => {
        
        if (typeof state === "undefined") {
            return initialState;
        }

        switch(action.type) {
            case CLEAR_BOARD:
                // Each case returns a new state object with
                // updated properties
                return Object.assign({}, state, {
                    // Changes state of dart board
                    emptyBoard: true
                })
            case THROW_DARTS:
                return Object.assign({}, state, {
                    // Changes state of the dart board
                })

            default:
                return state;

        }
        
    }

    {/* useEffect - the function that is input is performed after the components mount.
                    In other words, after everything loads, useEffect runs */}

    const dartBoard: DartBoard = new DartBoard();
    
    // Builds the dart board
    useEffect(dartBoard.designDartBoard, [])

    const disableButton = (buttonId: string) => {
        const buttonToDisable = document.getElementById(buttonId);
        if (!buttonToDisable) {
            return;
        }

        // Casting the button as an HTML Button Element
        (buttonToDisable as HTMLButtonElement).disabled = true;
    }

    /* Memoized - caches the result of the function and returns it when the same input returns again.
       useCallback returns a memoized callback that only changes if one of the dependencies (in the brackets)
       changes.
       */
    const handleDartButtonClick = useCallback((el) => {

        // This obtains the ID of the button element
        const id = get('target.id', el);
        if (!id) {
            return;
        }
        handleDarts(dartBoard, "throw");
        disableButton(id);
    }, [])

    const handleResetButton = useCallback((el) => {

        // This obtains the ID of the button element
        const id = get('target.id', el);
        if (!id) {
            return;
        }
        handleDarts(dartBoard, "remove");
    }, [])


    return <div>
        {/* TODO - Eventually Redesign to make this title look better */}
        <h1>Darts Guessing Game</h1>
        <p>
            500 darts will be thrown at the dart board below. Guess
            which section of the dart board received the most amount of darts.
            If you pick the area with the most darts, you win!
        </p>
        <div>
            <canvas id="dartBoardOutline" width="400px" height="400px"
                style={{
                    position: "absolute",
                    border: "3px solid rgb(201, 0, 0)",
                    marginTop: "20px",
                    marginBottom: "20px",
                    transform: "scale(0.9)"
                }} />
            <canvas id="darts" width="400px" height="400px"
                style = {{
                    position: "relative",
                    border: "3px solid rgb(201, 0, 0)",
                    marginTop: "20px",
                    marginBottom: "20px",
                    transform: "scale(0.9)"
                }}>

            </canvas>
        </div>

        {/* Empty div to separate the dartboard and the buttons */}
        <div />

        {/* Throw Darts and Reset Buttons */}
        <div style={{ width: "350px", left: "25px", display: "inline-flex", position: "relative" }}>
            {/* This button will call ThrowDarts */}
            <button onClick={handleDartButtonClick} id="dartButton" type="button" className="btn btn-danger">
                Throw Darts
            </button>

            <span style={{
                flex: "auto",
            }} />

            {/* This button will reset the dart board */}
            <button onClick={handleResetButton} id="handleResetButton" type="button" className="btn btn-danger">
                Reset
            </button>
        </div>

    </div>

};

export default App;