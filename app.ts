// Lets us check all boxes
let isPlayerOnesTurn = false;
for (let i = 1; i <= 3; i++) {
	document.querySelectorAll('td').forEach((child: HTMLElement) => {
		child.addEventListener('click', () => {
			// Check the player's box and assign class name
			if (child.className === 'grey') {
				child.style.backgroundColor = 'grey';
				isPlayerOnesTurn = !isPlayerOnesTurn;
			} else if (child.className === 'black') {
				child.style.backgroundColor = 'black';
				isPlayerOnesTurn = !isPlayerOnesTurn;
			} else {
				isPlayerOnesTurn ? (child.className = 'black') : (child.className = 'grey');
				if (child.className === 'grey') {
					child.style.backgroundColor = 'grey';
					isPlayerOnesTurn = !isPlayerOnesTurn;
				} else if (child.className === 'black') {
					child.style.backgroundColor = 'black';
					isPlayerOnesTurn = !isPlayerOnesTurn;
				}
			}
		});
	});
}
