class Square {
    /**
     * @param {Point} p1
     * @param {Point} p2
     * @param {boolean} prime
     */
    constructor(p1, p2, prime = false) {
        this.p1 = p1;
        this.p2 = p2;
        this.prime = prime;
        /**
         * @type {Square[]}
         */
        this.bounds = [];
    }

    setup() {
        this.p1.setup();
        this.p2.setup();
        this.p1.addMoveListener(this.recalculate.bind(this));
        this.p2.addMoveListener(this.recalculate.bind(this));

        const [x1, y1, x2, y2] = this.getCoords();

        this.p3 = new Point(x1, y1, this.prime ? 'orange' : 'black');
        this.p4 = new Point(x2, y2, this.prime ? 'purple' : 'black');

        this.p4.setup();
        this.p3.setup();
    }

    draw() {
        strokeWeight(this.prime ? 1 : 2);

        this.p1.line(this.p2);
        this.p2.line(this.p3);
        this.p3.line(this.p4);
        this.p4.line(this.p1);

        this.p1.draw();
        this.p2.draw();
        this.p3.draw();
        this.p4.draw();
    }

    /**
     * @param {Square} s
     */
    bind(s) {
        this.bounds.push(s);
    }

    recalculate() {
        const [x1, y1, x2, y2] = this.getCoords();
        this.p3.v.x = x1;
        this.p3.v.y = y1;
        this.p4.v.x = x2;
        this.p4.v.y = y2;

        for (const s of this.bounds) {
            s.recalculate();
        }
    }

    /**
     * @param {Square} s
     */
    recalculateWith(s) {
        const centerX = (this.p2.v.x + s.p3.v.x) / 2;
        const centerY = (this.p2.v.y + s.p3.v.y) / 2;

        const distX = this.p2.v.x - centerX;
        const distY = this.p2.v.y - centerY;

        this.p1.v.x = centerX - distY;
        this.p1.v.y = centerY + distX;

        this.recalculate();
    }

    getCoords() {
        const a = this.p1.v.y - this.p2.v.y;
        const b = this.p1.v.x - this.p2.v.x;

        const x1 = this.p2.v.x - a;
        const y1 = this.p2.v.y + b;

        const x2 = x1 + b;
        const y2 = y1 + a;

        return [x1, y1, x2, y2];
    }
}
