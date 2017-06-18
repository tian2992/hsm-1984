import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';

let downKey;
let player;
let timer;
let currentTime;
let bgParallaxer;
let fgParallaxer;
let states;

class GameState extends Phaser.State {

	create() {
		states = this.game.cache.getJSON('states');
		const center = { x: this.game.world.centerX - 250, y: this.game.world.centerY / 4 }
		this.music = this.game.add.audio('theme');
        this.music.play();

		this.background = this.game.add.group();
		bgParallaxer = new Parallaxer(this.game, 0, 0, 2380, 480, 'background');
		this.background.create(bgParallaxer);
		
		this.foreground = this.game.add.group();
		fgParallaxer = new Parallaxer(this.game, 0, this.game.world.bounds.height - 70, 2380, 70, 'foreground');
		fgParallaxer.enableBody = true;
		fgParallaxer.immovable = true;
		this.foreground.create(fgParallaxer);

    	player = new Player(this.game, center, 'playa');
		this.physics.arcade.collide(player, fgParallaxer);

		currentTime = 0;
		timer = this.game.time.create(false);
    	timer.loop(1000, this.checkState, this);
		timer.start();
	}

	initScrolling()
	{
		bgParallaxer.setSpeed(-1, 0);
		fgParallaxer.setSpeed(-3, 0);
	}

	update() {

	}

	checkState() {
		currentTime++;
		states.forEach((item) => {
			let state = item.state;
    		if(state.time == currentTime) {
				console.log(`doing state change! ${state.time}   ${currentTime}`);
				return player.swapAssets(state.player);
			}
		});
	}
 }

export default GameState;
