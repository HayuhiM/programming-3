function generator(matLen, gr, grEat, pr, fl, allEat) {
  let matrix = [];

  for (let i = 0; i < matLen; i++) {
    matrix[i] = [];
    for (let j = 0; j < matLen; j++) {
      matrix[i][j] = 0;
    }
  }


  for (let i = 0; i < gr; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 1;
    }
  }
  for (let i = 0; i < grEat; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 2;
    }
  }
  for (let i = 0; i < pr; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 3;
    }
  }
  for (let i = 0; i < fl; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 4;
    }
  }
  for (let i = 0; i < allEat; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 5;
    }
  }
  return matrix;
}

let side = 20;

let matrix = generator(side, 60, 25, 10, 10, 7);
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let flowerArr = []
let allEaterArr = []

function setup() {
  createCanvas(matrix[0].length * side, matrix.length * side);
  background('#acacac');
  frameRate(3)
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let gr = new Grass(x, y)
        grassArr.push(gr)
      } else if (matrix[y][x] == 2) {
        let grE = new GrassEater(x, y)
        grassEaterArr.push(grE)
      } else if (matrix[y][x] == 3) {
        let pr = new Predator(x, y)
        predatorArr.push(pr)
      } else if (matrix[y][x] == 4) {
        let fl = new Flower(x, y)
        flowerArr.push(fl)
      } else if (matrix[y][x] == 5) {
        let alE = new AllEater(x, y)
        allEaterArr.push(alE)
      }

    }
  }
  //console.log(allEaterArr);
}

function draw() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill('green')
      } else if (matrix[y][x] == 0) {
        fill('darkGray')
      } else if (matrix[y][x] == 2) {
        fill('gold')
      } else if (matrix[y][x] == 3) {
        fill('#ff3333')
      } else if (matrix[y][x] == 4) {
        fill('orchid')
      } else if (matrix[y][x] == 5) {
        fill('Teal')
      }
      rect(x * side, y * side, side, side)
    }
  }

  
  for (let i in grassArr) {
    grassArr[i].mul()
  }
  for (let i in allEaterArr) {
  	if(grassArr.length>200){
    	allEaterArr[i].moveAndEat(side)
    }
    
  }
  for (let i in predatorArr) {
    predatorArr[i].mul()
    predatorArr[i].eat()
  }
  for (let i in grassEaterArr) {
    grassEaterArr[i].mul()
    grassEaterArr[i].eat()
  }
 
  for (let i in flowerArr) {
    if (grassEaterArr.length < 5 && predatorArr.length == 0) {
      flowerArr[i].test(side)
    }

  }

}



