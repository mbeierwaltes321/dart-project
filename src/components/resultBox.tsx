import React, { FunctionComponent } from "react";
import { stateType } from "./redux/reducers";

const ResultBox: FunctionComponent<stateType> = (props) => {
    
    // Will display the correct message depending on whether the user
    // guessed right or not
    const displayWinOrLose = (won: boolean) => {
        
    }
    
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

        <div style={{position: "static"}}>
            <p>
                There is no emotion, there is peace.
                There is no ignorance, there is knowledge.
                There is no passion, there is serenity.
                There is no chaos, there is harmony.
                There is no death, there is the Force. --TEST--
            </p>
        </div>
        

    </div>
}

export default ResultBox;