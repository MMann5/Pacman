function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is inclusive and the minimum is inclusive
}

function getEmptyCell(board) {
  var emptyCell = []
  var coord = {}
  for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
          if (board[i][j] !== WALL &&
              board[i][j] !== SUPERFOOD &&
              board[i][j] !== PACMAN &&
              board[i][j] !== GHOST) {
              coord = {
                  i,
                  j,
              }
              emptyCell.push(coord)
          }
      }
  }
  return emptyCell
}
