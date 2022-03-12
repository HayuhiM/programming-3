function generator(matLen, gr, grEat, pr, fl, allEat, mush, wall) {
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
  for (let i = 0; i < mush; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 6;
    }
  }
  let x = 0
  let y = Math.floor(Math.random() * matLen);
  for (let i = 0; i < wall; i++) {
    x++
    if (matrix[x][y] == 0) {
      matrix[x][y] = 7;
    }
  }
  return matrix;
}

let side = 20;

let matrix = generator(side, 60, 25, 10, 10, 7, 10, 10);
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let flowerArr = []
let allEaterArr = []
let mushroomArr = []
let fireArr = []

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
      } else if (matrix[y][x] == 6) {
        let mush = new Mushroom(x, y)
        mushroomArr.push(mush)
      }

    }
  }
}

function draw() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill(colorGr)
      } else if (matrix[y][x] == 0) {
        fill(colorCanvas)
      } else if (matrix[y][x] == 2) {
        fill(colorGrEat)
      } else if (matrix[y][x] == 3) {
        fill(colorPr)
      } else if (matrix[y][x] == 4) {
        fill(colorFl)
      } else if (matrix[y][x] == 5) {
        fill(colorAllEat)
      } else if (matrix[y][x] == 6) {
        fill(colorMush)
      } else if (matrix[y][x] == 7) {
        fill(colorWall)
      } else if (matrix[y][x] == 8) {
        fill('red')
      }
      rect(x * side, y * side, side, side)
    }
  }

  setTimeout(function () {
    for (let i in grassArr) {
      grassArr[i].mul()
    }
  }, 1000)

  for (let i in allEaterArr) {
    if (grassArr.length > 200) {
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
  for (let i in fireArr) {
    fireArr[i].mul()
  }

  for (let i in flowerArr) {
    if (grassEaterArr.length < 5 && predatorArr.length == 0) {
      flowerArr[i].test(side)
    }
  }
}

function mouseClicked() {
  if (mouseX < 400 && mouseY > 1 && mouseY < 400 && mouseX > 1 && !iswinter) {
    var isTrue = true
    while (isTrue) {
      let x = Math.floor(Math.random() * side);
      let y = Math.floor(Math.random() * side);
      if (matrix[y][x] == 1) {
        matrix[y][x] = 8;
        var newfr = new Fire(x, y);
        fireArr.push(newfr);
        
        isTrue = false
      }
    }
  }
}
summer()

function winter(){
  iswinter=true
  console.log("Winter")
  colorGr = '#0B8745'
  colorCanvas = '#B6CED2'
  colorGrEat = '#F5DD59'
  colorPr = '#E38C86'
  colorFl = '#D88FE2'
  colorAllEat = '#CF418A'
  colorMush = '#C39264'
  colorWall = '#2D2E32'
}

function summer(){
iswinter = false
console.log("Summer")
colorGr = '#008000'
colorCanvas = '#A9A9A9'
colorGrEat = '#FFD700'
colorPr = '#E95D53'
colorFl = '#DA70D6'
colorAllEat = '#BB196A'
colorMush = '#B86E29'
colorWall = '#000000'
}
