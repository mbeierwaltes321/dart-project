import { inRange } from "lodash";
import Dart from "./Dart";

class DartBoard {
    private sectionOne: number;
    private sectionTwo: number;
    private sectionThree: number;
    private sectionFour: number;
    private sectionFive: number;
    private sectionSix: number;
    private allDarts: Dart[];

    constructor() {
        this.sectionOne = 0;
        this.sectionTwo = 0;
        this.sectionThree = 0;
        this.sectionFour = 0;
        this.sectionFive = 0;
        this.sectionSix = 0;
        this.allDarts = [];
    }

    get getDarts() {
        return this.allDarts;
    }

    // Draws the dartboard on the UI
    public designDartBoard() {
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

    // Returns the number of darts in the respective section
    public getDartsInSection(section: number) {

        switch (section) {
            case 1:
                return this.sectionOne;
            case 2:
                return this.sectionTwo;
            case 3:
                return this.sectionThree;
            case 4:
                return this.sectionFour;
            case 5:
                return this.sectionFive;
            case 6:
                return this.sectionSix;
            default:
                return 0;
        }
    }

    // Calculates location of dart and increments respective section
    public receiveDart(dart: Dart, index: number) {

        // Inserts the correct dart into the dart array
        this.allDarts[index] = dart;

        // Calculates necessary information for figuring out the dart section
        const lineDistance = dart.calculateLineDistance();
        const arcAngle = dart.calculateArcAngle();

        if (lineDistance <= 160 && inRange(arcAngle, 1, 59)) {
            this.sectionOne++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 61, 119)) {
            this.sectionTwo++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 121, 179)) {
            this.sectionThree++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 181, 239)) {
            this.sectionFour++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 241, 299)) {
            this.sectionFive++;
        } else if (lineDistance <= 160 && inRange(arcAngle, 301, 359)) {
            this.sectionSix++;
        }
    }

    public clearDarts() {
        this.allDarts = [];
    }

    public isEmpty() {
        return this.allDarts.length == 0;
    }
}

export default DartBoard;