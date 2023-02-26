class PixelateImage {
    constructor(img, position, resolution) {
        this.img = img;
        this.position = position;
        this.resolution = resolution;

        this.color = null;
    }

    process() {
        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let count = 0;

        this.img.loadPixels();
        for (let i = 0; i < this.img.pixels.length; i += 4) {
            totalR += this.img.pixels[i];
            totalG += this.img.pixels[i + 1];
            totalB += this.img.pixels[i + 2];
            count++;
        }

        this.color = [
            totalR / count,
            totalG / count,
            totalB / count
        ];
    }

    draw() {
        if (this.color == null) {
            // stroke(0);
            image(this.img, this.position.x, this.position.y, this.resolution.x, this.resolution.y);
            noFill();
        } else {
            fill(this.color[0], this.color[1], this.color[2]);
            noStroke();
        }

        rect(this.position.x, this.position.y, this.resolution.x, this.resolution.y);
    }
}
