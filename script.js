document.addEventListener('DOMContentLoaded', () => {
     // Get the game board, player X score element, and player O score element
    const board = document.getElementById('game-board');
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');

    let currentPlayer = 'X'; // Tracks the current player ('X' or 'O')
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true; // Indicates if the game is currently active
    let playerXScore = 0; // Tracks the score for Player X
    let playerOScore = 0; // Tracks the score for Player O

    // Function to render the game board based on the current state
    const renderBoard = () => {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellElement);
        });
    };

    // Function to handle clicks on the game board cells
    const handleCellClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') return; // Check if the game is active and the clicked cell is empty

        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWin() || checkDraw()) { // Check for a win or draw condition and end the game if necessary
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    // Function to check if the current player has won the game
    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) { // Check if the cells in the current pattern have the same symbol (X or O)
                updateScore();
                return true;
            }
        }

        return false;
    };

    // Function to check if the game has ended in a draw
    const checkDraw = () => {
        if (gameBoard.every(cell => cell !== '')) {
            endGame();
            return true;
        }
        return false;
    };

    // Function to update the score based on the current player
    const updateScore = () => {
        if (currentPlayer === 'X') {
            playerXScore++;
            playerXScoreElement.textContent = playerXScore;
        } else {
            playerOScore++;
            playerOScoreElement.textContent = playerOScore;
        }
    };

    // Function to end the game and display an alert with the winner
    const endGame = () => {
        gameActive = false;
        setTimeout(() => {
            alert(`Game Over!\nPlayer ${currentPlayer} wins!`);
            resetGame();
        }, 100);
    };

    // Function to reset the game to its initial state
    const resetGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        renderBoard();
    };

    renderBoard();
});
