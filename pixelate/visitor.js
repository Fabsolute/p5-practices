class Visitor {
    constructor(images,cb) {
        this.images = this.shuffle([...images]);
        this.index = 0;
        this.cb = cb;
    }

    visitNext() {
        if (this.index >= this.images.length) {
            this.cb();
            return;
        }

        this.images[this.index].process();
        this.index++;
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}
