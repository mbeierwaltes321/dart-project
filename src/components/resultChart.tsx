import React, { FunctionComponent } from "react";
import { stateType } from "../Redux_Management/reducers";
import { useSelector } from "react-redux";
import { BarChart } from "recharts";

const ResultChart: FunctionComponent < any > = () => {

 
    return <div id="resultChart" hidden={true} style={{width: "800px", height:"400px" }}>
    
        {/* <BarChart>


        </BarChart>         */}

    </div>
    
}

export default ResultChart;