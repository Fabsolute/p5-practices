const WIDTH = 128;
const HEIGHT = 64;
const SQUARE_WIDTH = 16;

const squares = [];

let visitor;

function start() {
    visitor = new Visitor(squares[0], squares);
}

function setup() {
    // frameRate(15);
    createCanvas(SQUARE_WIDTH * WIDTH, SQUARE_WIDTH * HEIGHT);

    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            squares.push(
                new Square(
                    createVector(j, i),
                    SQUARE_WIDTH
                )
            );
        }
    }

    start();
}

function draw() {
    background(255);

    for (const square of squares) {
        square.drawVisited();
    }

    for (const square of squares) {
        square.draw();
    }

    if (visitor == null) {
        return;
    }

    visitor.draw();
    visitor.update();
}
