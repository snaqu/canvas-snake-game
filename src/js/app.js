const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

const box = 32;

const ground = new Image();
const foodImg = new Image();
ground.src = 'static/ground1.png';
foodImg.src = 'static/food.png';

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 9 * box
};

let food = {
	x: Math.floor(Math.random() * 18 + 1) * box,
	y: Math.floor(Math.random() * 17 + 2) * box,
};

let score = 0;

// CONTROL THE SNAKE.
let direction = '';
document.addEventListener('keydown', () => {
	if (event.keyCode == 37 && direction !== 'RIGHT') {
		direction = 'LEFT';
	} else if (event.keyCode == 38 && direction !== 'DOWN') {
		direction = 'UP';
	} else if (event.keyCode == 39 && direction !== 'LEFT') {
		direction = 'RIGHT';
	} else if (event.keyCode == 40 && direction !== 'UP') {
		direction = 'DOWN';
	}
});

function collision(head, array) {
	for (let i = 0; i < array.length; i++) {
		if (head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
}

// DRAW.

function draw() {

	ctx.drawImage(ground, 0, 0);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = (i == 0) ? 'gray' : 'white';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (direction == 'LEFT') snakeX -= box;
	if (direction == 'UP') snakeY -= box;
	if (direction == 'RIGHT') snakeX += box;
	if (direction == 'DOWN') snakeY += box;

	if (snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor(Math.random() * 18 + 1) * box,
			y: Math.floor(Math.random() * 17 + 2) * box
		};
	} else {
		snake.pop();
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	if (snakeX < 0 || snakeX > 18 * box || snakeY < 2 * box || snakeY > 18 * box || collision(newHead, snake)) {
		clearInterval(game);
	}

	snake.unshift(newHead);
	ctx.fillStyle = 'white';
	ctx.font = '45px Changa one';
	ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);











// ctx.fillRect(20, 20, 10, 10); // prostokąt.
// ctx.clearRect(45, 45, 60, 60); //czyści obszar i robi go przeźroczystym.
// ctx.strokeRect(50, 50, 50, 50); // obramowanie porstokąta.

// ctx.font = 'italic bold 30px Arial';
// ctx.textBaseline = 'middle';
// // ctx.textAlign = 'right';
// ctx.fillText('yolo', 100, 180);
// ctx.strokeText('jololo', 10, 180);

// ctx.beginPath();
// ctx.strokeStyle = 'red';
// ctx.moveTo(200, 200);
// ctx.lineTo(250, 200);
// ctx.lineTo(280, 250);
// ctx.lineTo(200, 250);
// ctx.lineTo(200, 200);
// ctx.stroke();

// ctx.beginPath();
// ctx.fillStyle = '#6DCF00';
// ctx.moveTo(300, 200);
// ctx.lineTo(350, 200);
// ctx.lineTo(300, 250);
// ctx.lineTo(300, 200);
// ctx.fill();