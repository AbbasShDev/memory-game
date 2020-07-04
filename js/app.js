$(document).ready(function() {
	let objects = [
		'bicycle',
		'bicycle',
		'leaf',
		'leaf',
		'cube',
		'cube',
		'anchor',
		'anchor',
		'paper-plane',
		'paper-plane',
		'bolt',
		'bolt',
		'bomb',
		'bomb',
		'car',
		'car'
	];

	preGame();
	let compared = [];
	let count = 0;
	let gameTimer = null;
	function preGame() {
		let shuffledArray = shuffle(objects);

		for (let i = 0; i < shuffledArray.length; i++) {
			let newObject = `
		<div class="game-item" data-name="${shuffledArray[i]}">
		<div class="game-item-overlay" hidden></div>
        <i class="fas fa-${shuffledArray[i]} fa-3x"></i>
      	</div>
		`;

			$('.game-container').append(newObject);
		}

		$('#game-ovarlay').addClass('game-container-overlay');
		let counter = 5;
		let interval = setInterval(function() {
			counter--;

			// Display 'counter' wherever you want to display it.
			if (counter <= 0) {
				clearInterval(interval);
				$('#game-ovarlay').removeClass('game-container-overlay');
				$('#counter').text('');
				startGame();
				timer(20);
				return;
			} else {
				$('#counter').text(counter);
			}
		}, 1000);
	}

	function startGame() {
		$('.game-item-overlay').fadeIn(100);
		$('.game-item').click(function() {
			$(this).find('.game-item-overlay').fadeOut('fast');

			if ($(this).hasClass('compered')) {
				return;
			}
			compared.push($(this));

			if (compared.length == 2) {
				let firstCell = compared[0];
				let secondCell = compared[1];
				let matched = false;

				if (firstCell.data('name') == secondCell.data('name')) {
					matched = true;
				} else {
					matched = false;
				}

				if (matched) {
					compared[0].addClass('compered');
					compared[1].addClass('compered');
					compared = [];
					count++;
					winner();
				} else {
					compared[0].find('.game-item-overlay').fadeIn(1000);
					compared[1].find('.game-item-overlay').fadeIn(1000);
					compared = [];
				}
			}
		});
	}

	function winner() {
		if (count == 8) {
			$('#game-ovarlay').addClass('game-container-overlay');
			$('#counter').text('Winner!');
			clearInterval(gameTimer);
		}
	}

	function timer(num) {
		let counter = num;

		gameTimer = setInterval(function() {
			counter--;

			// Display 'counter' wherever you want to display it.
			if (counter <= 0) {
				clearInterval(gameTimer);
				$('#game-ovarlay').addClass('game-container-overlay');
				$('#counter').text('Game Over!');
				return;
			} else {
				$('.timer span').text(counter);
			}
		}, 1000);
	}

	$('.restart').click(function() {
		compared = [];
		count = 0;
		clearInterval(gameTimer);
		$('.game-container').html('');
		$('.timer span').text('');
		$('#counter').text('');
		preGame();
	});

	//Source: https://stackoverflow.com/questions/2450954
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
});
