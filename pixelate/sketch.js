const EXPECTED_WIDTH = 4;
const EXPECTED_HEIGHT = 4;

const MAX_WIDTH = 32;
const MAX_HEIGHT = 32;

let WIDTH;
let HEIGHT;

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 1024;

const images = [];
let visitor;

let completed = false;

function start(url) {
    load(url, img => {
        WIDTH = img.width;
        HEIGHT = img.height;
    });
}

function load(url, cb) {
    loadImage(url, img => {
        cb?.(img);
        WIDTH /= 2;
        HEIGHT /= 2;

        if(WIDTH>MAX_WIDTH){
            WIDTH = MAX_WIDTH;
        }

        if(HEIGHT>MAX_HEIGHT){
            HEIGHT = MAX_HEIGHT;
        }

        if (WIDTH <= EXPECTED_WIDTH) {
            WIDTH = EXPECTED_WIDTH;
        }

        if (HEIGHT <= EXPECTED_HEIGHT) {
            HEIGHT = EXPECTED_HEIGHT;
        }

        if (WIDTH === EXPECTED_WIDTH && HEIGHT === EXPECTED_HEIGHT) {
            completed = true;
        }

        img.resize(CANVAS_WIDTH, CANVAS_HEIGHT);
        process(img);
        visitor = new Visitor(images,finished);
    });
}

function process(img) {
    images.length = 0;
    const perWidth = img.width / WIDTH;
    const perHeight = img.height / HEIGHT;

    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            const newImg = img.get(j * perWidth, i * perHeight, perWidth, perHeight);
            images.push(new PixelateImage(
                newImg,
                createVector(j * perWidth, i * perHeight),
                createVector(perWidth, perHeight)
            ));
        }
    }
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // frameRate(15);
}

function draw() {
    background(255);
    for (let i = 0; i < images.length; i++) {
        images[i].draw();
    }

    if (visitor == null) {
        return;
    }

    visitor.visitNext();
}

function finished() {
    if (completed) {
        return;
    }

    const canvas = document.querySelector('canvas');
    const img = canvas.toDataURL('image/png')
    load(img);
}
