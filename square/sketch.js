const square1 = new Square(
    new Point(79, 875, 'red', true),
    new Point(512, 975, 'blue', true),
    true,
);

const square2 = new Square(
    new Point(550, 450, 'red', true),
    new Point(850, 350, 'blue', true),
    true,
);

const square3 = new Square(
    new Point(0, 0, 'black'),
    new Point(0, 0, 'black'),
);

function setup() {
    createCanvas(1024, 1024);
    square1.setup();
    square2.setup();

    square3.setup();
    square3.recalculateWith(square1, square2);
}

function draw() {
    background(255);
    square1.drawTo(square2);
    square1.draw();
    square2.draw();
    square3.recalculateWith(square1, square2);
    square3.draw();
}
