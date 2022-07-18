const p1 = new Point(128, 412, 'white', true);

const square1 = new Square(
    new Point(200, 450, 'red', true),
    p1,
    true,
);

const square2 = new Square(
    p1,
    new Point(256, 375, 'blue', true),
    true,
);

let square3;
let square4;

function setup() {
    createCanvas(1024, 1024);
    square1.setup();
    square2.setup();

    square3 = new Square(
        square2.p3,
        new Point(120, 600, 'pink', true),
        true,
    );

    square3.setup();
    square2.bind(square3);

    // p2 her seferinde hesaplatilmali!!11
    square4 = new Square(
        new Point(0, 0, 'red'),
        square1.p4,
    );

    square4.setup();
    square4.recalculateWith(square3);
}

function draw() {
    background(255);

    noStroke();
    fill("#ADD8E67F");
    beginShape();
    vertex(square2.p2.v.x,square2.p2.v.y);
    vertex(square1.p3.v.x,square1.p3.v.y);
    vertex(square4.p1.v.x,square4.p1.v.y);
    vertex(square3.p4.v.x,square3.p4.v.y);
    endShape(CLOSE);

    fill("#FFC0CB7F");
    beginShape();
    vertex(square2.p4.v.x,square2.p4.v.y);
    vertex(square3.p2.v.x,square3.p2.v.y);
    vertex(square4.p3.v.x,square4.p3.v.y);
    vertex(square1.p1.v.x,square1.p1.v.y);
    endShape(CLOSE);


    // square2.p2.line(square1.p3);
    // square1.p3.line(square4.p1);
    // square4.p1.line(square3.p4);
    // square3.p4.line(square2.p2);

    square1.draw();
    square2.draw();
    square3.draw();

    square4.recalculateWith(square3);
    square4.draw();
}
