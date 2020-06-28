import React, { useCallback } from "react";
import { get } from "lodash/fp";
import max from "lodash/max";
import { stateType } from "./redux/reducers";

const GuessBox: React.FunctionComponent< stateType > = (props) => {

    const checkIfGreatest = (guess: number) => {
        
        const dartSectionList: number[] = [];
        
        // Puts the number of darts in a section in the respective index
        // of the array
        for (let i = 1; i <= 6; i++) {
            dartSectionList.push(props.board.getDartsInSection(i));
        }

        console.log(dartSectionList);
        console.log("The max is " + max(dartSectionList));
        
        // ! is the null assertion operator; assures that max() isn't undefined
        return guess >= max(dartSectionList)!;
    
    }

    const guessSection = useCallback((el) => {
        
        let rightChoice: boolean = false;

        const id = get("target.id", el);
        if (!id) {
            return;
        }
        switch(id) {
        case "sectionOneButton":
            rightChoice = checkIfGreatest(props.board.getDartsInSection(1));
            return rightChoice;
            break;
        case "sectionTwoButton":
            rightChoice = checkIfGreatest(props.board.getDartsInSection(2));
            return rightChoice;
            break;
        case "sectionThreeButton":
            rightChoice = checkIfGreatest(props.board.getDartsInSection(3));
            return rightChoice;
            break;
        case "sectionFourButton":
            rightChoice = checkIfGreatest(props.board.getDartsInSection(4));
            return rightChoice;
            break;
        case "sectionFiveButton":
            rightChoice = checkIfGreatest(props.board.getDartsInSection(5));
            return rightChoice;
            break;
        case "sectionSixButton":
            rightChoice = checkIfGreatest(props.board.getDartsInSection(6));
            return rightChoice;
            break;
        default:
            return false;

        };

    
    }, []);
    

    // This will eventually replace the div in App.tsx
    return <div className="bg-primary"
        style={{
            border: "5px solid black",
            marginTop: "40px",
            position: "absolute",
            width: "300px",
            height: "200px",
            background: "purple"
        }}>

        {/* "Vote" Layer */}
        <div style={{
                width: "290px",
                height: "40px",
                paddingTop: "10px",
                paddingLeft: "120px",
                paddingRight: "120px",
            }}>

                <h3 id="voteSign" style={{color: "yellow"}}>
                    Vote
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

}

export default GuessBox;