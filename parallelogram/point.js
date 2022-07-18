const r = 10;

class Point {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} color
     * @param {boolean} prime
     */
    constructor(x, y, color, prime = false) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.prime = prime;

        this.listeners = [];
        this.initialized = false;
    }

    setup() {
        if (this.initialized) {
            return;
        }

        this.initialized = true;
        this.v = createVector(this.x, this.y);
        delete this.x;
        delete this.y;
    }

    draw() {
        fill(this.color);
        ellipse(
            this.v.x,
            this.v.y,
            this.prime ? 2 * r : r,
            this.prime ? 2 * r : r,
        );

        if (!this.prime) {
            return;
        }

        if (this.isMousePressed()) {
            this.v.x = mouseX;
            this.v.y = mouseY;

            for (const listener of this.listeners) {
                listener();
            }
        }
    }

    addMoveListener(listener) {
        this.listeners.push(listener);
    }

    isMousePressed() {
        if (!mouseIsPressed) {
            return false;
        }

        return dist(mouseX, mouseY, this.v.x, this.v.y) <= r;
    }

    /**
     * @param {Point} p
     * @param {boolean} sameColor
     */
    line(p, sameColor = false) {
        stroke(sameColor ? this.color : 0);
        line(this.v.x, this.v.y, p.v.x, p.v.y);
    }
}
