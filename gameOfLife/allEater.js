
class AllEater {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    moveAndEat(side) {
        var newX = this.x + 1
        var newY = this.y
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        this.forInArr(grassArr)
        this.forInArr(grassEaterArr)
        this.forInArr(predatorArr)
        this.forInArr(flowerArr)

    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in allEaterArr) {
            if (this.x == allEaterArr[i].x && this.y == allEaterArr[i].y) {
                allEaterArr.splice(i, 1);
                break;
            }
        }
    }

    forInArr(arr) {
        for (var i in arr) {
            if (this.x == arr[i].x && this.y == arr[i].y) {
                arr.splice(i, 1);
                break;
            }
        }
    }
}