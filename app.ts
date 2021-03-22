// Lets us check all boxes
for (let i = 1; i <= 3; i++) {
	document.getElementById(`tr-${i}`).childNodes.forEach((child: any) => {
		let squareIsChecked = false;
		child.addEventListener('click', () => {
			squareIsChecked = !squareIsChecked;
			if (squareIsChecked) {
				child.style.backgroundColor = 'black';
			} else {
				child.style.backgroundColor = 'white';
			}
		});
	});
}
