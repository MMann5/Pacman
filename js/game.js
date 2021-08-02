'use strict'
const WALL = '+'
const FOOD = '..'
const EMPTY = ' ';
const SUPERFOOD = '🍩'
const CHERY = '🍒'


var gIntervalCherry
var foodCount = 0
var food = 50
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    foodCount = 0
    gGame.score = 0
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    console.table(gBoard);
    gIntervalCherry = setInterval(function () {
        addCherry()
    }, 15000)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if ((i === 1 && j === 1) || (i === 8 && j === 1) ||
                (i === 8 && j === 8) || (i === 1 && j === 8)) board[i][j] = SUPERFOOD
            if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 || j === 3 && i > 4 && i < SIZE - 2) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    openModal()
}

function openModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'inline'
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    init()
}


function addCherry() {
    var emptyCells = getEmptyCell(gBoard)
    var randomIdx = getRandomInt(0, emptyCells.length)
    var cellI = emptyCells[randomIdx].i
    var cellJ = emptyCells[randomIdx].j
    if (gBoard[cellI][cellJ] !== WALL && gBoard[cellI][cellJ] !== SUPERFOOD &&
        gBoard[cellI][cellJ] !== PACMAN && gBoard[cellI][cellJ] !== GHOST) {
        gBoard[cellI][cellJ] = CHERY
    }
    printMat(gBoard, '.board-container')
}