import React from "react";
import { useEffect } from "react";
import DartBoard from "./dartBoard";
import Dart from "./Dart";
import { stateType } from "./redux/reducers";
import { action } from "./redux/actions";

const GuessBox: React.FunctionComponent<stateType> = (props) => {

    // This will eventually replace the div in App.tsx
    return <div className="bg-primary"
        style={{
            display: "inline-block",
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

            <button style={{ width: "90px", height: "50px" }} id="sectionOneButton" type="button" className="btn btn-dark"> Section 1 </button>
            <span style={{ flex: "auto" }}> </span>
            <button style={{ width: "90px", height: "50px" }} id="sectionOneButton" type="button" className="btn btn-dark"> Section 2 </button>
            <span style={{ flex: "auto" }}> </span>
            <button style={{ width: "90px", height: "50px" }} id="sectionOneButton" type="button" className="btn btn-dark"> Section 3 </button>

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

            <button style={{ width: "90px", height: "50px" }} id="sectionOneButton" type="button" className="btn btn-dark"> Section 4 </button>
            <span style={{ flex: "auto" }}> </span>
            <button style={{ width: "90px", height: "50px" }} id="sectionOneButton" type="button" className="btn btn-dark"> Section 5 </button>
            <span style={{ flex: "auto" }}> </span>
            <button style={{ width: "90px", height: "50px" }} id="sectionOneButton" type="button" className="btn btn-dark"> Section 6 </button>

        </div>


    </div>

}

export default GuessBox;