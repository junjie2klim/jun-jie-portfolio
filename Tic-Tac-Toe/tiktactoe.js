let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let playerXName, playerOName;

function startGame() {
    playerXName = document.getElementById('playerX').value;
    playerOName = document.getElementById('playerO').value;

    if (playerXName && playerOName) {
        document.getElementById('name-form').classList.add('hidden');
        document.getElementById('game-wrapper').classList.remove('hidden');
        document.getElementById('game-container').classList.remove('hidden'); // Show the game container
        document.getElementById('backButton').style.display = 'inline-block';
        currentPlayer = 'X';
        updatePlayerTurn();
        gameActive = true;
    } else {
        alert('Please enter names for both players.');
    }
}

function goBack() {
    document.getElementById('name-form').classList.remove('hidden');
    document.getElementById('game-wrapper').classList.add('hidden');
    document.getElementById('game-container').classList.add('hidden'); // Hide the game container
    document.getElementById('backButton').style.display = 'none';
    resetGame();
}

function updatePlayerTurn() {
    document.getElementById('player-turn').innerText = `Current Turn: ${currentPlayer === 'X' ? playerXName : playerOName}`;
}

function handleClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;

        if (checkWinner()) {
            endGame(`Player ${currentPlayer === 'X' ? playerXName : playerOName} wins!`);
        } else if (gameBoard.every(cell => cell !== '')) {
            endGame('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerTurn();
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination =>
        gameBoard[combination[0]] !== '' &&
        gameBoard[combination[0]] === gameBoard[combination[1]] &&
        gameBoard[combination[1]] === gameBoard[combination[2]]
    );
}

function endGame(result) {
    gameActive = false;
    document.getElementById('result').innerText = result;
    document.getElementById('result-popup').classList.remove('hidden');
}

function newGame() {
    document.getElementById('result-popup').classList.add('hidden');
    resetGame();
}

function quitGame() {
    document.getElementById('result-popup').classList.add('hidden');
    document.getElementById('game-wrapper').classList.add('hidden');
    document.getElementById('name-form').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden'); // Hide the game container
    document.getElementById('backButton').style.display = 'none';
    resetGame();
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updatePlayerTurn();
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
}

updatePlayerTurn();
