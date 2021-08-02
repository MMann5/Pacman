'use strict'
var PACMAN = '<img src="img/pacman.png">'
var SUPERPACMAN = '<img src="img/super.png">'
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log(nextCell)

    if (gPacman.isSuper) {
        if (nextCell === SUPERFOOD) return
    }
    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
        foodCount++
    } else if (nextCell === CHERY) updateScore(10);
    else if (nextCell === SUPERFOOD) {
        gPacman.isSuper = true
        setTimeout(function () {
            gPacman.isSuper = false
        }, 5000)
    } else if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            var elH2 = document.querySelector('.modal h2')
            elH2.textContent = 'YOU LOOSE'
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        } else {
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    gGhosts.splice(i, 1)
                }
            }
            setTimeout(function () {
                gGhosts.push(createGhost())
            }, 5000)

        }
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the dom
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    // update the model
    var pacman = (gPacman.isSuper) ? SUPERPACMAN : PACMAN;
    gBoard[gPacman.location.i][gPacman.location.j] = pacman
    // update the dom
    renderCell(gPacman.location, pacman);
    if (foodCount === food) {
        elH2 = document.querySelector('.modal h2')
        elH2.textContent = 'YOU WIN !'
        gameOver()
    }
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            if (gPacman.isSuper) {
                SUPERPACMAN = '<img  class = "up" src="img/super.png">'
            } else PACMAN = '<img class = "up" src="img/pacman.png">'
            break;
        case 'ArrowDown':
            nextLocation.i++;
            if (gPacman.isSuper) {
                SUPERPACMAN = '<img  class = "down" src="img/super.png">'
            } else
                PACMAN = '<img class = "down" src="img/pacman.png">'
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            if (gPacman.isSuper) {
                SUPERPACMAN = '<img  class = "left" src="img/super.png">'
            } else
                PACMAN = '<img class = "left" src="img/pacman.png">'
            break
        case 'ArrowRight':
            nextLocation.j++;
            if (gPacman.isSuper) {
                SUPERPACMAN = '<img src="img/super.png">'
            } else
                PACMAN = '<img src="img/pacman.png">'
            break
        default:
            return null;
    }
    return nextLocation;
}