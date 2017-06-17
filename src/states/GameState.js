import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';

let downKey;
let player;
let timer;
let currentTime;

class GameState extends Phaser.State {

	create() {
		const center = { x: this.game.world.centerX - 250, y: this.game.world.centerY / 4 }
		this.music = this.game.add.audio('theme');
        this.music.play();

		this.background = this.game.add.group();
		this.background.create(new Parallaxer(this.game, 0, 0, 2380, 480, 'background', -1, 0));
		
		this.foreground = this.game.add.group();
		const floor = new Parallaxer(this.game, 0, this.game.world.bounds.height - 70, 2380, 70, 'foreground', -3, 0);
		floor.enableBody = true;
		floor.immovable = true;
		this.foreground.create(floor);

    	player = new Player(this.game, center, 'playa');
		this.physics.arcade.collide(player, floor);

		currentTime = 0;
		timer = this.game.time.create(false);
    	timer.loop(1000, this.checkState, this);
		timer.start();
	}

	update() {

	}

	checkState() {
		currentTime++;
		if(currentTime  == 10)
		{
			player.swapAssets('adventurer');
		}
	}
 }

export default GameState;
