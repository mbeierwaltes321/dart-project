import React, { FunctionComponent, useEffect } from "react";
import { stateType } from "../Redux_Management/reducers";
import { useSelector } from "react-redux";
import {
    BarChart,
    XAxis,
    YAxis,
    Bar,
    ResponsiveContainer,
    Tooltip,
    Label,
    CartesianGrid
} from "recharts";

const ResultChart: FunctionComponent <any> = () => {

    const guessed = useSelector((state: stateType) => state.userHasGuessed);
    const data = useSelector((state: stateType) => state.boardData);

    // Updates whether the result chart is hidden or not
    useEffect(() => {
        (document.getElementById("resultChart") as HTMLDivElement).hidden = !guessed;
    }, [guessed]);
 
    return <div id="resultChart" style={{ width: "600px", height:"450px", margin:"10px" }}>
        <div style={{display: "flex", alignItems:"center", justifyContent: "center"}}>
            <h2> Data Spread </h2>
        </div>
        <div style={{ width: "600px", height:"400px"  }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3"/>
                    <XAxis dataKey="name">
                        <Label position="insideBottom" offset={-4} value="Section of Dart Board"
                            fontFamily="'Trebuchet MS', Helvetica, sans-serif "/>
                    </XAxis>
                    <YAxis>
                        <Label position="insideLeft" angle={-90} offset={10} value="Number of Darts"
                            fontFamily="'Trebuchet MS', Helvetica, sans-serif "/>
                    </YAxis>
                    <Tooltip/>
                    <Bar
                        dataKey="numberOfDarts"
                        fill="rgb(180, 0, 0)"
                        stroke="black"
                        strokeWidth="2px"/>
                </BarChart>
            </ResponsiveContainer>         
        </div>

    </div>
    
}

export default ResultChart;