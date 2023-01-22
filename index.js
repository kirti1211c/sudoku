const N = 9;

const numberList = Array.from(new Array(N), (_, i) => i + 1)
let grid = Array.from(new Array(N), () => Array.from(new Array(N), () => 0));
let ques = Array.from(new Array(N), () => Array.from(new Array(N), () => 0));
let ans = Array.from(new Array(N), () => Array.from(new Array(N), () => 0));
const shuffle = (list) => list.sort(() => 0.5 - Math.random());

const checkGrid = (grid) => {
    for (const row of grid) {
        for (const entry of row) {
            if (entry === 0)
                return false
        }
    }
    return true
}

const getValuesInSquare = (grid, row, col) => {
    const factor = Math.sqrt(N)
    const squareX = Math.floor(col / factor);
    const squareY = Math.floor(row / factor);

    const values = new Set()

    for (let j = (squareX * factor); j < ((squareX + 1) * factor); j++) {
        for (let i = (squareY * factor); i < ((squareY + 1) * factor); i++) {
            values.add(grid[i][j])
        }
    }

    return values
}
let counter=0;
// let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const solveGrid = (grid) => {
    let row, col;
    for (let i = 0; i < N * N; i++) {
        row = Math.floor(i / N), col = i % N;
        if (grid[row][col] === 0) {
            // const shuffledList = shuffle(numberList);
            for (const value of numberList) {
                // Check that this value has not been already used
                if (!(grid[row].includes(value))) {
                    // Check that this value has not already been used in the column
                    if (!grid.some(row => row[col] === value)) {
                        const squareValues = getValuesInSquare(grid, row, col);
                        // Check that square doesnt have the value
                        if (!squareValues.has(value)) {
                            grid[row][col] = value;
                            if (checkGrid(grid)) {
                                counter++;
                                return true
                            } else if (solveGrid(grid)) {
                                return true
                            }
                        }
                    }
                }
            }
            break
        }
    }
    grid[row][col] = 0
}

const fillGrid = (grid) => {
    let row, col;;
    for (let i = 0; i < N * N; i++) {
        row = Math.floor(i / N), col = i % N;
        if (grid[row][col] === 0) {
            const shuffledList = shuffle(numberList);
            for (const value of shuffledList) {
                // Check that this value has not been already used
                if (!(grid[row].includes(value))) {
                    // Check that this value has not already been used in the column
                    if (!grid.some(row => row[col] === value)) {
                        const squareValues = getValuesInSquare(grid, row, col);
                        // Check that square doesnt have the value
                        if (!squareValues.has(value)) {
                            grid[row][col] = value;
                            if (checkGrid(grid)) {
                                return true
                            } else if (fillGrid(grid)) {
                                return true
                            }
                        }
                    }
                }
            }
            break
        }
    }
    grid[row][col] = 0
}
let attempts = 1
counter=1

const generateGrid = (num) => {
    counter=1
    let num_remove=0;
    while (num_remove<num) {
        let row = Math.floor((Math.random() * 9))
        let col = Math.floor((Math.random() * 9))
        while (grid[row][col]==0) {
            row = Math.floor((Math.random() * 9))
            col = Math.floor((Math.random() * 9))
        }
        let backup = grid[row][col];
        grid[row][col]=0;
        num_remove++;
        const copyGrid = Array.from(new Array(N), () => Array.from(new Array(N), () => 0));
        for (let r=0;r<9;r++) {
            for (let c=0;c<9;c++) {
                copyGrid[r][c]=grid[r][c];
            }
        }
        counter=0
        solveGrid(copyGrid)
        if (counter!=1) {
            grid[row][col]=backup;
            attempts -= 1;
            num_remove++;
        }
        
        for (let ro=0;ro<9;ro++) {
            for (let cl=0;cl<9;cl++) {
                ans[ro][cl]=grid[ro][cl];
            }
        }
        
        
    }
    
}

// let xi = [[0, 4, 0, 0, 0, 3, 0, 0, 5], [7, 3, 0, 2, 0, 0, 6, 9, 0], [9, 0, 8, 0, 0, 1, 7, 4, 3], [2, 0, 0, 5, 4, 6, 0, 0, 0], [3, 0, 4, 0, 0, 0, 0, 0, 0], [0, 5, 6, 7, 0, 0, 9, 0, 0], [8, 0, 7, 0, 0, 5, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 6, 0], [5, 9, 0, 4, 6, 0, 0, 0, 0]]

const newGrid = (num) => {
    fillGrid(grid);
    for (let r=0;r<9;r++) {
        for (let c=0;c<9;c++) {
            ques[r][c]=grid[r][c];
        }
    }
    // console.log(ques);

    generateGrid(num);
    // console.log(ans);
    // console.log("**********");
    grid = Array.from(new Array(N), () => Array.from(new Array(N), () => 0));
    
}



const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

//Create- variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function () {
    id("start-btn").addEventListener("click", startGame);
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].addEventListener("click", function () {
            if (!disableSelect) {
                if (this.classList.contains("selected")) {
                    this.classList.remove("selected");
                    selectedNum = null;
                } else {
                    for (let i = 0; i < 9; i++) {
                        id("number-container").children[i].classList.remove("selected");
                    }
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();

                }
            }
        })
    }
}
function convert_grid(grid) {
    let s = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] == 0) {
                s += "-";
            } else {
                s += grid[i][j];
            }
        }
    }
    return s;
}

function startGame() {
    let board;
    if (id("diff-1").checked) {
        newGrid(20);
        // console.log(ques);
        // console.log(ans);
        // let x = fillGrid(grid)
        let a1 = convert_grid(ques);
        let a2 = convert_grid(ans);
        easy[0]=a2;
        easy[1]=a1;
        board = easy[0];
    }
    else if (id("diff-2").checked){
        newGrid(30);
        // console.log(ques);
        // console.log(ans);
        let a1 = convert_grid(ques);
        let a2 = convert_grid(ans);
        medium[0]=a2;
        medium[1]=a1;
        board = medium[0];
    } 
    else{ 
        newGrid(40);
        // console.log(ques);
        // console.log(ans);
        let a1 = convert_grid(ques);
        let a2 = convert_grid(ans);
        hard[0]=a2;
        hard[1]=a1;
        board = hard[0];
    }

    lives = 3;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining : 3";

    generateBoard(board);
    startTimer();
    if (id("theme-1").checked) {
        qs("body").classList.remove("dark");
        qs("body").classList.remove("coloured");
    } else if (id("theme-2").checked) {
        qs("body").classList.remove("coloured");
        qs("body").classList.add("dark");
    } else {
        qs("body").classList.remove("dark");
        qs("body").classList.add("coloured");
    }
    id("number-container").classList.remove("hidden");

}

function startTimer() {
    if (id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;

    id("timer").textContent = timeConversion(timeRemaining);
    timer = setInterval(function () {
        timeRemaining--;
        if (timeRemaining == 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)
}

function timeConversion(time) {
    let minu = Math.floor(time / 60);
    if (minu < 10) minu = "0" + minu;
    let sec = time % 60;
    if (sec < 10) sec = "0" + sec;
    return minu + ":" + sec;
}

function generateBoard(board) {
    clearPrevious();
    let idCount = 0;
    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("p");
        if (board.charAt(i) != "-") {
            tile.textContent = board.charAt(i);
        } else {
            tile.addEventListener("click", function () {
                if (!disableSelect) {
                    if (tile.classList.contains("selected")) {
                        tile.classList.remove("selected");
                        selectedTile = null;
                    } else {
                        for (let i = 0; i < 81; i++) {
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            })
        }

        tile.id = idCount;
        idCount++;
        tile.classList.add("tile");
        if (tile.id > 17 && tile.id < 27 || (tile.id > 44 && tile.id < 54)) {
            tile.classList.add("bottomBorder");
        }
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("rightBorder");
        }

        id("board").appendChild(tile);
    }
}

function updateMove() {
    if (selectedNum && selectedTile) {
        selectedTile.textContent = selectedNum.textContent;
        if (checkCorrect(selectedTile)) {
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            selectedNum = null;
            selectedTile = null;
            if (checkDone()) {
                endGame();
            }
        } else {
            disableSelect = true;
            selectedTile.classList.add("incorrect");
            setTimeout(function () {
                lives--;
                if (lives === 0) {
                    endGame();
                } else {
                    id("lives").textContent = "Lives Remaining: " + lives;
                    disableSelect = false;
                }

                selectedTile.classList.remove("selected");
                selectedTile.classList.remove("incorrect");
                selectedNum.classList.remove("selected");
                selectedTile.textContent = "";
                selectedNum = null;
                selectedTile = null;
            }, 1000)
        }
    }
}


function checkDone() {
    let tiles = qsa(".tile");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].textContent === "") {
            return false;
        }
    }
    return true;
}

function endGame() {
    disableSelect = true;
    clearTimeout(timer);
    if (lives === 0 || timeRemaining === 0) {
        id("lives").textContent = "You Lost!";
    } else {
        id("lives").textContent = "You Won!";
    }
}


function checkCorrect(tile) {
    let solution;
    if (id("diff-1").checked) solution = easy[1];
    else if (id("diff-2").checked) solution = medium[1];
    else solution = hard[1];
    if (solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}

function clearPrevious() {
    //Access-all-of -the-tiles
    let tiles = qsa(".tile");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }
    if (timer) clearTimeout(timer);

    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].classList.remove("selected");
    }

    selectedTile = null;
    selectedNum = null;
}

function id(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}
