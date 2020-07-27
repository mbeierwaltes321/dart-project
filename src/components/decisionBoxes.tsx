import React, { FunctionComponent, useCallback, useState } from "react";
import { get } from "lodash/fp";
import max from "lodash/max";
import { clearBoard, throwDarts, correctChoice, incorrectChoice } from "../Redux_Management/actions";
import { stateType } from "../Redux_Management/reducers";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import DartBoard from '../data_strucs/dartBoard';


// When React-Redux is added, the props will be changed
// Contains two components: the Guess Box and the result box.
// The result box component is built within the 
const DecisionBoxes: FunctionComponent<{ board: DartBoard}> = (props) => {

    // const board: any = useSelector( (state: stateType) => {state.board});
    // const emptyBoard: any = useSelector( (state: stateType) => {state.emptyBoard});
    // const userIsCorrect: any = useSelector( (state: stateType) => {state.userIsCorrect});
    const boxState: any = useSelector( (state: stateType) => {
        return {
            emptyBoard: state.emptyBoard,
            userisCorrect: state.userIsCorrect
        }
    });
    const dispatch = useDispatch();

    const checkIfGreatest = (guess: number) => {
        
        const dartSectionList: number[] = [];
        
        // Puts the number of darts in a section in the respective index
        // of the array
        for (let i = 1; i <= 6; i++) {
            dartSectionList.push(props.board.getDartsInSection(i));
        }

        // ! is the null assertion operator; assures that max() isn't undefined
        return guess >= max(dartSectionList)!;
    
    }
    
    const guessSection = useCallback((el) => {
        
        let rightChoice: boolean = false;

        const id = get("target.id", el);
        
        if (!id) {
            return;
        }

        // Reveals the Result Box after the guess
        const result_box = document.getElementById("resultBox");
        (result_box as HTMLDivElement).hidden = false;

        switch (id) {
            case "sectionOneButton":
                rightChoice = checkIfGreatest(props.board.getDartsInSection(1));
                rightChoice == true ? dispatch(correctChoice()) : dispatch(incorrectChoice());
                pickResultMessage();
                return rightChoice;
            case "sectionTwoButton":
                rightChoice = checkIfGreatest(props.board.getDartsInSection(2));
                rightChoice == true ? dispatch(correctChoice()) : dispatch(incorrectChoice());
                pickResultMessage();
                return rightChoice;
            case "sectionThreeButton": 
                rightChoice = checkIfGreatest(props.board.getDartsInSection(3));
                rightChoice == true ? dispatch(correctChoice()) : dispatch(incorrectChoice());
                pickResultMessage();
                return rightChoice;
            case "sectionFourButton":
                rightChoice = checkIfGreatest(props.board.getDartsInSection(4));
                rightChoice == true ? dispatch(correctChoice()) : dispatch(incorrectChoice());
                pickResultMessage();
                return rightChoice;
            case "sectionFiveButton":
                rightChoice = checkIfGreatest(props.board.getDartsInSection(5));
                rightChoice == true ? dispatch(correctChoice()) : dispatch(incorrectChoice());
                pickResultMessage();
                return rightChoice;
            case "sectionSixButton":
                rightChoice = checkIfGreatest(props.board.getDartsInSection(6));
                rightChoice == true ? dispatch(correctChoice()) : dispatch(incorrectChoice());
                pickResultMessage();
                return rightChoice;
            default:
                dispatch(incorrectChoice());
                return false;
        };

    
    }, []);

    // Will display the correct message depending on whether the user
    // guessed right or not
    // Odd error where the padding wouldn't change when testing out the functionality
    const pickResultMessage = () => {

        if (boxState.emptyBoard) {
            changeResultMessage("Still empty");
            return;
        }
        
        const won: boolean = boxState.userIsCorrect;

        if (won) {
            changeResultMessage("You win!");
        } else {
            changeResultMessage("You lose!");
        }
    
    }

    // useState hook needed for changing the result box's text
    const [resultMessage, changeResultMessage] = useState("Empty");

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
    
            <div style={{position: "static", color: "cyan"}}>    
                <div id="topLayer" style={{width: "300px", height: "50px"}}>
                    <h3 id="message" style={{paddingLeft: "95px"}}>
                    {resultMessage}
                    </h3>
                </div>
                <div id="bottomlayer" style={{width: "290px", height: "90px", color: "blue", paddingLeft: "10px", paddingRight: "10px"}}>
                    { /* TODO - Change design in future */ }
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
                    paddingLeft: "75px",
                }}>
                
                <h3 id="voteSign" style={{color: "yellow"}}>
                    Pick Section
                </h3>
    
            </div>
    
            {/* Layer 1 - Section 1 2 and 3 buttons*/}
            <div
                style={{
                    height: "70px",
                    width: "290px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "5px"
                }}>
    
                <button onClick={guessSection} style={{ width: "90px", height: "50px" }} id="sectionOneButton" type="button" className="btn btn-dark"> Section 1 </button>
                <span style={{ flex: "auto" }}> </span>
                <button onClick={guessSection} style={{ width: "90px", height: "50px" }} id="sectionTwoButton" type="button" className="btn btn-dark"> Section 2 </button>
                <span style={{ flex: "auto" }}> </span>
                <button onClick={guessSection} style={{ width: "90px", height: "50px" }} id="sectionThreeButton" type="button" className="btn btn-dark"> Section 3 </button>
    
            </div>
    
            {/* Layer 2 - Section 4 5 and 6 buttons*/}
            <div
                style={{
                    height: "70px",
                    width: "290px",
                    paddingTop: "5px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "5px"
                }}>
    
                <button onClick={guessSection} style={{ width: "90px", height: "50px" }} id="sectionFourButton" type="button" className="btn btn-dark"> Section 4 </button>
                <span style={{ flex: "auto" }}> </span>
                <button onClick={guessSection} style={{ width: "90px", height: "50px" }} id="sectionFiveButton" type="button" className="btn btn-dark"> Section 5 </button>
                <span style={{ flex: "auto" }}> </span>
                <button onClick={guessSection} style={{ width: "90px", height: "50px" }} id="sectionSixButton" type="button" className="btn btn-dark"> Section 6 </button>
    
            </div>
    
        </div>

        <div id="resultBox" hidden={true} >
            <ResultBox />
        </div>
    </div>

}

export default DecisionBoxes;