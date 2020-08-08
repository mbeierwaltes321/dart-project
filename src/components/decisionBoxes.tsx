import React, { FunctionComponent, useState, useEffect } from "react";
import { correctChoice, incorrectChoice } from "../Redux_Management/actions";
import { stateType } from "../Redux_Management/reducers";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import DartBoard from '../data_strucs/dartBoard';
import maxBy  from 'lodash/maxBy';

// Contains two components: the Guess Box and the result box.
// The result box component is built within the 
const DecisionBoxes: FunctionComponent<{ board: DartBoard }> = (props) => {

    // useState hook needed for changing the result box's text
    const [resultMessage, setResultMessage] = useState("Empty");

    const emptyBoard = useSelector((state: stateType) =>  state.emptyBoard);
    const userIsCorrect = useSelector((state: stateType) => state.userIsCorrect);
    const boardData = useSelector((state: stateType) => state.boardData);
    const dispatch = useDispatch();

    const checkIfGreatest = (guess: number) => {
        // ! is the null assertion operator; assures that data is not undefined
        return (guess >= maxBy(boardData, (data) => data.numberOfDarts)!.numberOfDarts!);
    }

    const guessSection = (section: number) => {

        // Reveals the Result Box after the guess
        const result_box = document.getElementById("resultBox");
        (result_box as HTMLDivElement).hidden = false;

        // Updates redux if the user guessed correctly
        checkIfGreatest(props.board.getDartsInSection(section))
            ? dispatch(correctChoice())
            : dispatch(incorrectChoice());
    }

    // Updates result message depending on user's guess
    useEffect(() => {
        if (emptyBoard) {
            setResultMessage("Still empty");
            return;
        }

        if (userIsCorrect) {
            setResultMessage("You win!");
        } else {
            setResultMessage("You lose!");
        }
    }, [emptyBoard, userIsCorrect]);

    // ResultBox Component
    const ResultBox: FunctionComponent<any> = (props) => {

        return <div className="bg-success"
            style={{
                position: "absolute",
                height: "150px",
                width: "300px",
                marginBottom: "20px",
                marginTop: "15px",
                border: "5px solid black",
                whiteSpace: "normal"
            }}>

            <div style={{ position: "static", color: "cyan" }}>
                <div id="topLayer" style={{
                    width: "300px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center" }}>
                    <h3 id="message">
                        {resultMessage}
                    </h3>
                </div>
                <div id="bottomlayer" 
                        style={{ 
                            width: "290px",
                            height: "90px",
                            color: "blue",
                            paddingLeft: "10px",
                            paddingRight: "10px"
                        }}>
                    { /* TODO - Change design in future */}
                    <h6>
                        Please click on the reset
                        button to play again, or
                        look at the graph to see
                        the dart spread
                    </h6>
                </div>

            </div>

        </div>
    }

    // Guess box component; contains the result box component
    return <div>
        <div className="bg-primary"
            style={{
                border: "5px solid black",
                marginTop: "40px",
                position: "static",
                width: "300px",
                height: "200px",
                background: "purple"
            }}>

            {/* "Pick Selection" Layer */}
            <div style={{
                width: "290px",
                height: "40px",
                paddingTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>

                <h3 id="voteSign" style={{ color: "yellow" }}>
                    Pick Section
                </h3>

            </div>

            {/* Layer 1 - Section 1 2 and 3 buttons*/}
            <div
                style={{
                    height: "70px",
                    width: "290px",
                    paddingTop: "10px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-evenly"
                }}>

                <button onClick={() => { guessSection(1) }}
                        style={{ width: "90px", height: "50px" }}
                        id="sectionOneButton"
                        type="button"
                        className="btn btn-dark">
                            Section 1 </button>

                <button onClick={() => { guessSection(2) }}
                        style={{ width: "90px", height: "50px" }}
                        id="sectionTwoButton"
                        type="button"
                        className="btn btn-dark"> Section 2 </button>

                <button onClick={() => { guessSection(3) }}
                        style={{ width: "90px", height: "50px" }}
                        id="sectionThreeButton"
                        type="button"
                        className="btn btn-dark"> Section 3 </button>
            </div>

            {/* Layer 2 - Section 4 5 and 6 buttons*/}
            <div
                style={{
                    height: "70px",
                    width: "290px",
                    paddingTop: "5px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-evenly"
                }}>

                <button onClick={() => { guessSection(4) }}
                        style={{ width: "90px", height: "50px" }}
                        id="sectionFourButton"
                        type="button"
                        className="btn btn-dark">
                            Section 4 </button>

                <button onClick={() => { guessSection(5) }}
                        style={{ width: "90px", height: "50px" }}
                        id="sectionFiveButton"
                        type="button"
                        className="btn btn-dark">
                            Section 5 </button>

                <button onClick={() => { guessSection(6) }}
                        style={{ width: "90px", height: "50px" }}
                        id="sectionSixButton"
                        type="button"
                        className="btn btn-dark">
                            Section 6 </button>
            </div>
        </div>

        <div id="resultBox" hidden={true} >
            <ResultBox />
        </div>
    </div>

}

export default DecisionBoxes;