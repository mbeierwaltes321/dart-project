import React from "react";
import ReactDOM from "react-dom";
import { number } from "prop-types";
import { random, inRange } from "lodash";

class Dart {
   private x: number;
   private y: number;

    constructor() {
        this.x = random(40, 360);
        this.y = random(40, 360);
    }

    get dartX() {
        return this.x;
    }

    get dartY() {
        return this.y;
    }

    // Calculates and returns the arc angle depending on the quadrant of the circle
    calculateArcAngle() {
        let dartArcAngle: number = 0;
        const lineDistance = Math.sqrt(Math.pow((200 - this.x), 2) + Math.pow((200 - this.y), 2));

        // Quadrant I
        if (inRange(this.x, 200, 360) && inRange(this.y, 40, 200)) {
            dartArcAngle = (Math.atan((200 - this.y) / (this.x - 200))) / (Math.PI / 180);
        }

        // Quadrant II
        if (inRange(this.x, 40, 200) && inRange(this.y, 40, 200)) {
            dartArcAngle = 180 - ((Math.atan((200 - this.y) / (200 - this.x))) / (Math.PI / 180));
        }

        // Quadrant III
        if (inRange(this.x, 40, 200) && inRange(this.y, 200, 360)) {
            dartArcAngle = 270 - ((Math.atan((200 - this.x) / (this.y - 200))) / (Math.PI / 180));
        }

        // Quadrant IV
        if (inRange(this.x, 200, 360) && inRange(this.y, 200, 360)) {
            dartArcAngle = 360 - ((Math.atan((this.y - 200) / (this.x - 200))) / (Math.PI / 180));
        }

        return dartArcAngle;
    }

    // Calculates the length of the point from the origin
    calculateLineDistance() {
        
        // Line distance is the distance between the dart and the center of the dartboard
        const lineDistance: number = Math.sqrt(Math.pow((200 - this.x), 2) + Math.pow((200 - this.y), 2));
        return lineDistance;
    }

}

export default Dart;