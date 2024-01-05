// Initialize the Tic Tac Toe board
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// Define players 'X' and 'O'
let players = ['X', 'O'];

// Track the current player's turn
let currentPlayer;

// Store available positions on the board
let available = [];

function setup() {
  // Set up the canvas
  createCanvas(400, 400);
  frameRate(30);

  // Randomly select the starting player
  currentPlayer = floor(random(players.length));

  // Populate the available positions on the board
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

// Helper function to check if three values are equal and not empty
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

// Check if there's a winner or a tie
function checkWinner() {
  let winner = null;

  // Check for a winner in horizontal rows
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Check for a winner in vertical columns
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Check for a winner in diagonals
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  // Check for a tie
  if (winner == null) {
    let isTie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          isTie = false;
          break;
        }
      }
    }
    if (isTie) {
      return 'tie';
    }
  }

  return winner;
}

// Handle mouse click events
function mouseClicked() {
  // Check if the click is within the canvas boundaries
  if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) {
    return;
  }

  // Determine the clicked cell
  let i = floor(mouseX / (width / 3));
  let j = floor(mouseY / (height / 3));

  // Check if the cell is available and mark it with the current player's symbol
  if (board[i][j] === '') {
    board[i][j] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
  }
}

// Draw the Tic Tac Toe board and check for a winner/tie
function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);

  // Draw the grid lines
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  // Draw X and O symbols on the board
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }

  // Check for a winner or tie and display the result
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
