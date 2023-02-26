const EDGE_LEFT = 0;
const EDGE_TOP = 1;
const EDGE_RIGHT = 2;
const EDGE_BOTTOM = 3;

const color1 = [145, 237, 237];
const color2 = [52, 82, 235];

class Square {
    constructor(position, width) {
        // left, top, right, bottom
        this.edges = [true, true, true, true];
        this.position = position;
        this.width = width;
        this.pointVisible = false;
        this.visited = false;
        this.visitPoint = 0;
    }

    draw() {
        const leftTopPosition = this.position;
        const leftBottomPosition = createVector(leftTopPosition.x, leftTopPosition.y + 1);
        const rightTopPosition = createVector(this.position.x + 1, this.position.y);
        const rightBottomPosition = createVector(rightTopPosition.x, rightTopPosition.y + 1);

        this.drawPoint(leftTopPosition);
        this.drawPoint(leftBottomPosition);
        this.drawPoint(rightTopPosition);
        this.drawPoint(rightBottomPosition);

        this.drawLine(leftBottomPosition, leftTopPosition, this.edges[EDGE_LEFT]);
        this.drawLine(leftTopPosition, rightTopPosition, this.edges[EDGE_TOP]);
        this.drawLine(rightTopPosition, rightBottomPosition, this.edges[EDGE_RIGHT]);
        this.drawLine(rightBottomPosition, leftBottomPosition, this.edges[EDGE_BOTTOM]);
    }

    drawVisited() {
        if (this.visited) {
            // return;
            noStroke();
            fill(
                map(this.visitPoint, 0, 5, color1[0], color2[0], true),
                map(this.visitPoint, 0, 5, color1[1], color2[1], true),
                map(this.visitPoint, 0, 5, color1[2], color2[2], true)
            );
            rect(this.position.x * this.width, this.position.y * this.width, this.width, this.width);
        }
    }

    drawLine(pos1, pos2, draw) {
        if (!draw) {
            return;
        }

        stroke(0);
        strokeWeight(4);
        line(pos1.x * this.width, pos1.y * this.width, pos2.x * this.width, pos2.y * this.width);
    }

    drawPoint(position) {
        if (!this.pointVisible) {
            return;
        }

        fill(0);
        ellipse(position.x * this.width, position.y * this.width, 10, 10);
    }

    setEdge(edge, value) {
        this.edges[edge] = value;
    }

    setVisited(value) {
        this.visited = value;
        this.visitPoint++;
    }

    getLeftPosition() {
        return createVector(this.position.x - 1, this.position.y);
    }

    getRightPosition() {
        return createVector(this.position.x + 1, this.position.y);
    }

    getTopPosition() {
        return createVector(this.position.x, this.position.y - 1);
    }

    getBottomPosition() {
        return createVector(this.position.x, this.position.y + 1);
    }
}
