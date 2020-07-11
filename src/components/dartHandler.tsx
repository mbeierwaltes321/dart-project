import DartBoard from "../data_strucs/dartBoard"
import Dart from "../data_strucs/Dart";
import Bluebird from 'bluebird';

// Deals with the darts being thrown at the dartboard
const handleDarts = async (dartBoard: DartBoard, act?: string) => {

    // Sets up canvas for the dart dots
    const canvas = document.getElementById("darts");
    const dartDots = (canvas as HTMLCanvasElement).getContext("2d");
    if (canvas === null) {
        return;
    }

    if (dartDots === null) {
        return;
    }

    // Empties darts method and clears the dart canvas
    if (act === "remove") {
        dartBoard.clearDarts();
        dartDots.clearRect(0, 0, 400, 400);
        return;
    }

    if (act === "throw") {
        // Adds the dots for each dart.
        const throwDart = (i: number) => {
            return new Promise((resolve) => {
                const newDart = new Dart();
                dartDots.fillStyle = "rgb(0, 110, 26)";

                /* TODO - make a function that adds variability to each dart within this loop right here */

                dartDots.fillRect(newDart.dartX, newDart.dartY, 3, 3);
                dartBoard.receiveDart(newDart, i);
                resolve();
            });
        }

        // Await waits for the promise, and then it throws the dart by invoking throwDart
        // Bluebird is used because it can delay promises.
        for (let i = 0; i < 500; i++) {
            await Bluebird.delay(0.00001).then(() => throwDart(i));
        }
    }
}

export default handleDarts;