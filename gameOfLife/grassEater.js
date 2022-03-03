
class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGr = new GrassEater(newX, newY);
            grassEaterArr.push(newGr);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if(newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            if(this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        var emptyCellsfl = this.chooseCell(4);
        var newCellfl = random(emptyCellsfl);
        var emptyCellsmush = this.chooseCell(6);
        var newCellmush = random(emptyCellsmush);
        
        if(newCellmush){
            this.energy+=3
            var newX = newCellmush[0];
            var newY = newCellmush[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in mushroomArr) {
                if (newX == mushroomArr[i].x && newY == mushroomArr[i].y) {
                    mushroomArr.splice(i, 1);
                    break;
                }
            }
        }else if(newCellfl) {
            var newX = newCellfl[0];
            var newY = newCellfl[1];
            this.die()
            matrix[this.y][this.x] = 3;
            var newGr = new Predator(this.x, this.y);
            predatorArr.push(newGr);

        }else if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}