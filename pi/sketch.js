let count = 0;
let inCount = 0;

let nearest = 0;

function setup() {
    createCanvas(1024, 1024);
    noStroke();
}

function draw() {
    count++;

    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    fill('red');
    if (Math.sqrt(Math.pow(x - 512, 2) + Math.pow(y - 512, 2)) <= 512) {
        fill('green');
        inCount++;
    }

    const newNumber = (inCount/count)*4;
    if(Math.abs(newNumber-Math.PI)<Math.abs(nearest-Math.PI)){
        nearest = newNumber;
    }

    ellipse(x, y, 10, 10);

    fill('white');
    rect(0,0,200,50);
    textSize(32);
    fill('black');
    text(newNumber.toFixed(3),0,32);

    fill('purple');
    text(nearest.toFixed(3),100,32);
}
