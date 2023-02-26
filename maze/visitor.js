class Visitor {
    constructor(square, squares) {
        this.squares = squares;
        this.square = square;

        this.square.setVisited(true);

        this.stack = [];
    }

    update() {
        const neighbour = this.getNeighbour();
        if (neighbour == null) {
            if(this.stack.length === 0){
                return;
            }

            this.square = this.stack.pop();
            this.square.setVisited(true);
            return;
        }

        this.move(neighbour);
    }

    draw() {
        this.drawRect(this.square.position);
    }

    drawRect(position) {
        const width = this.square.width / 2;
        fill(50, 84, 168);
        noStroke();
        rect(position.x * this.square.width + width / 2, position.y * this.square.width + width / 2, width, width);
    }

    getNeighbour() {
        const neighbours = [];
        for (let i = 0; i < 4; i++) {
            if (this.square.edges[i]) {
                const neighbour = this.getSquare(i);

                if (neighbour == null || neighbour.visited) {
                    continue;
                }

                neighbours.push(i);
            }
        }

        if (neighbours.length === 0) {
            return null;
        }

        return neighbours[Math.floor(Math.random() * neighbours.length)];
    }

    move(edge) {
        this.square.setEdge(edge, false);
        this.stack.push(this.square);

        const next = this.getSquare(edge);
        next.setEdge(this.getOppositeEdge(edge), false);
        next.setVisited(true);

        this.square = next;
    }

    getSquare(edge) {
        let position;
        switch (edge) {
            case EDGE_LEFT:
                position = this.square.getLeftPosition();
                break;
            case EDGE_RIGHT:
                position = this.square.getRightPosition();
                break;
            case EDGE_BOTTOM:
                position = this.square.getBottomPosition();
                break;
            case EDGE_TOP:
                position = this.square.getTopPosition();
                break;
        }

        if (position.x < 0 || position.y < 0) {
            return null;
        }

        if (position.x >= WIDTH || position.y >= HEIGHT) {
            return null;
        }

        const index = position.y * WIDTH + position.x;
        return this.squares[index];
    }

    getOppositeEdge(edge) {
        return (edge + 2) % 4;
    }
}
