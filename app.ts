// Setup
const statusDisplay = document.querySelector('.game--status') as HTMLHeadingElement;
let gameActive = true;
let currentPlayer = 'X';
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// State of each cell
let gameState = ['', '', '', '', '', '', '', '', ''];

// Positions that denote a win
const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

// Display who's turn it is
statusDisplay.innerHTML = currentPlayerTurn();

// Update game state and board to reflect played move
const handleCellPlayed = (clickedCell: HTMLElement, clickedCellIndex: number) => {
	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.innerHTML = currentPlayer;
};

// Changes the current turn
const handlePlayerChange = () => {
	// Changes current player to the opposite of what it is
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	statusDisplay.innerHTML = currentPlayerTurn();
};

// Runs every turn and checks for a win
const handleResultValidation = () => {
	let roundWon = false;

	// Check each winning condition and match to board
	for (let i = 0; i <= winningConditions.length - 1; i++) {
		// Gets a wiin condition
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];

		// Break iteration and try again
		if (a === '' || b === '' || c === '') {
			continue;
		}

		// If they're all equal, the game is won
		if (a === b && b === c) {
			roundWon = true;
			break;
		}
	}

	// Display winning message
	if (roundWon) {
		statusDisplay.innerHTML = winningMessage();
		gameActive = false;
		return;
	}

	// Check for a draw
	let roundDraw = !gameState.includes('');
	if (roundDraw) {
		statusDisplay.innerHTML = drawMessage();
		gameActive = false;
		return;
	}

	// Next Turn
	handlePlayerChange();
};

// Check if a cell can be clicked or not
const handleCellClick = (event: { target: any }) => {
	// Get clicked cell
	const clickedCell = event.target as HTMLElement;

	// Get it's index
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

	// Don't do anything if the game isn't active or the cell is taken
	if (gameState[clickedCellIndex] !== '' || !gameActive) return;

	// Proceed with game flow
	handleCellPlayed(clickedCell, clickedCellIndex);
	handleResultValidation();
};

// Reset all variables
const handleRestartGame = () => {
	gameActive = true;
	currentPlayer = 'X';
	gameState = ['', '', '', '', '', '', '', '', ''];
	statusDisplay.innerHTML = currentPlayerTurn();
	document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
};

// Event Listeners for game cells and restart
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
document.querySelectorAll('.cell').forEach((cell) => {
	cell.addEventListener('click', handleCellClick);
});
