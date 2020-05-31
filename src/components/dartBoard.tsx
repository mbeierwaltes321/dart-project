import React from "react"
import {useEffect} from "react"
import { random, inRange, delay } from "lodash";
import Dart from "./Dart";
import Bluebird from 'bluebird';

/* 
Here are the goals of the project
1. Add a reset button that cleans up the darts from the dartboard
2. Add variability to the darts being thrown
3. Add Bizchart to display the results
*/
const DesignDartBoard = () => {

    // The circle that forms the dartboard
    const canvas = document.getElementById("dartBoardOutline");
    const circle = (canvas as HTMLCanvasElement).getContext("2d");

    if (canvas === null) {
        return;
    }

    if (circle === null) {
        return;
    }

    circle.fillStyle = "#FF0000";
    circle.beginPath();

    // The center is (200, 200) on the canvas, and the radius is 160 px long
    circle.arc(200, 200, 160, 0, 2 * Math.PI);
    circle.lineWidth = 5;
    circle.fillStyle = "rgb(3, 252, 244)";
    circle.fill();

    //Horizontal line
    circle.moveTo(40, 200);
    circle.lineTo(360, 200);
    circle.lineWidth = 3;

    //Line with upward slope
    circle.moveTo(120, 338);
    circle.lineTo(280, 62);
    circle.lineWidth = 3;

    //Line with downward slope
    circle.moveTo(120, 62);
    circle.lineTo(280, 338);
    circle.lineWidth = 3;

    // // Temp vertical line
    // circle.moveTo(200, 40);
    // circle.lineTo(200, 360);

    circle.stroke();
}

let allDarts: Dart[] = [];

// Making these darts into a state.
    // When you click "Throw Darts"
    // 1: Calculate the position all darts. Store this information in allDarts array
    // 2: Iterate through the allDarts array. Draw dart on canvas
    // When you click "Reset"
    // 3: Set allDarts to []

// Deals with the darts being thrown at the dartboard
const handleDarts = async (act?: string) => {

    let section1: number = 0;
    let section2: number = 0;
    let section3: number = 0;
    let section4: number = 0;
    let section5: number = 0;
    let section6: number = 0;

    // Counts the number of darts in each section depending on the arc angle
    // and checks if the dart is on the dartboard by checking its distance from the center
    const countDart = (newDart: Dart) => {

        const lineDistance = newDart.calculateLineDistance();
        const arcAngle = newDart.calculateArcAngle();

        if (lineDistance <= 160 && inRange(arcAngle, 1, 59)) {
            section1++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 61, 119)) {
            section2++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 121, 179)) {
            section3++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 181, 239)) {
            section4++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 241, 299)) {
            section5++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 301, 359)) {
            section6++;
        }
    }

    // Sets up canvas for the dart dots
    const canvas = document.getElementById("darts");
    const dartDots = (canvas as HTMLCanvasElement).getContext("2d");
    if (canvas === null) {
        return;
    }

    if (dartDots === null) {
        return;
    }

    // // Method for getting rid of the darts
    // const emptyBoard = dartDots.getImageData(0, 0, 400, 400);
    // dartDots.putImageData(emptyBoard, 0, 0);

    if (act === "remove") {
        allDarts = [];
        dartDots.clearRect(0, 0, 400, 400);
        return;

    }
    

    if (act === "throw") {
        // Adds the dots for each dart.
        // Sends out a promise to return a function
        const fn = (i: number) => {
            return new Promise((resolve) => {
                const newDart = new Dart();
                 dartDots.fillStyle = "rgb(0, 110, 26)";

                /* TODO - make a function that adds variability to each dart within this loop right here */

                 dartDots.fillRect(newDart.x, newDart.y, 3, 3);
                allDarts[i] = newDart;
                countDart(newDart);
                resolve();
            });
        }

        // Await waits for the promise, and then it throws the dart by invoking fn(i)
        // Bluebird is used because it can delay promises.
        for (let i = 0; i < 500; i++) {
            await Bluebird.delay(0.00001).then(() => fn(i));
        }
    }
}


export default DesignDartBoard;
export {
    handleDarts,
};