
class Flower {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    test(side) {
        var newX = Math.floor(Math.random() * side);
        var newY = Math.floor(Math.random() * side);
        if (matrix[newY][newX] == 1) {
            matrix[newY][newX] = 2;
            var newGr = new GrassEater(newX, newY);
            grassEaterArr.push(newGr);
        }
    }
}