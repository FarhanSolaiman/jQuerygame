$(function (){

	const container = $('.container');
	const bird = $('.chicken');
	const pole = $('.pole');
	const pole1 = $('#pole1');
	const pole2 = $('#pole2');
	const score = $('#score');
	const speedspan = $('#speed');
	const restart = $('#restart');

	let containerwidth = parseInt(container.width());
	let containerheight = parseInt(container.height());
	let poleinitialpos = parseInt(pole.css('right'));
	let poleinitialheight = parseInt(pole.css('height'));
	let birdleft = parseInt(bird.css('left'));
	let birdheight = parseInt(bird.height());
	let speed = 10;

	let goup = false;
	let scoreupdate = false;
	let gameover = false;

	let thegame = setInterval(function () {

		if (collision(bird,pole1) || collision(bird,pole2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > containerheight - birdheight) {
			stopthegame();
		}
		else {
			let polecurrentpos = parseInt(pole.css('right'));

			if (polecurrentpos > containerwidth - birdleft) {
				if (scoreupdate === false) {
					score.text(parseInt(score.text()) + 1);
					scoreupdate = true;
				}
			}

			if (polecurrentpos > containerwidth) {
				let newheight = parseInt(Math.random()*100);

				pole1.css('height',poleinitialheight + newheight);
				pole2.css('height',poleinitialheight - newheight);

				speed = speed + 1;
				speedspan.text(speed);

				scoreupdate = false;

				polecurrentpos = poleinitialpos;
			}

		pole.css('right',polecurrentpos + speed);

		if (goup === false) {
			godown();
		}
		}

	}, 40);

	$(document).on('keydown',function (e) {
		let key = e.keyCode;
		if (key === 32 && goup === false && gameover === false) {
			goup = setInterval(up, 50);
		}
	});

	$(document).on('keyup',function (e) {
		let key = e.keyCode;
		if (key === 32) {
			clearInterval (goup);
			goup = false;
		}
	});

	function godown() {
		bird.css('top', parseInt(bird.css('top')) + 5);
	}

	function up() {
		bird.css('top', parseInt(bird.css('top')) - 10);
	}

	function stopthegame() {
		clearInterval(thegame);
		gameover = true;
	}

	restart.click(function(){
		location.reload();
	});

	function collision($one, $two) {
		let x1 = $one.offset().left;
		let y1 = $one.offset().top;
		let h1 = $one.outerHeight(true);
		let w1 = $one.outerWidth(true);
		let b1 = y1 + h1;
		let r1 = x1 + w1;
		let x2 = $two.offset().left;
		let y2 = $two.offset().top;
		let h2 = $two.outerHeight(true);
		let w2 = $two.outerWidth(true);
		let b2 = y2 + h2;
		let r2 = x2 + w2;

		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
		return true;
	}	
});