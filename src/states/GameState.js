import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';
import Item from 'entities/Item';
import { State, ArrayUtils, Signal } from '../../build/scripts/phaser.js';

let downKey;
let player;
let floor;
let item;
let timer;
let currentTime;
let currentScore = 0;

class GameState extends State {

	create() {
		const center = { x: this.game.world.centerX - 250, y: this.game.world.centerY / 4 }
		this.music = this.game.add.audio('theme');
		this.music.play();

		this.background = this.game.add.group();
		this.background.create(new Parallaxer(this.game, 0, 0, 2380, 480, 'background', -1, 0));

		this.foreground = this.game.add.group();
		floor = new Parallaxer(this.game, 0, this.game.world.bounds.height - 70, 2380, 70, 'foreground', -3, 0);
		floor.enableBody = true;
		floor.immovable = true;
		this.foreground.create(floor);

		player = new Player(this.game, center, 'playa');

		const itemPosition = center;
		const items = ['blueGem', 'redGem'];
		itemPosition.y = this.game.world.bounds.height - 80;
		itemPosition.x = this.game.world.bounds.width + 20;

		item = new Item(this.game, itemPosition, ArrayUtils.getRandomItem(items));

		currentTime = 0;
		timer = this.game.time.create(false);
		timer.loop(1000, this.checkState, this);
		timer.start();
	}

	update() {
		this.physics.arcade.collide(player, floor);
		this.physics.arcade.collide(player, item, this.addScore, null, this)
	}

	addScore(player, collider) {
		if (collider.type === 'item') {
			currentScore = currentScore + collider.points;
			collider.destroy();
			console.log('current score is ' + currentScore);
		}
	}

	checkState() {
		currentTime++;
		if (currentTime == 10) {
			player.swapAssets('adventurer');
		}
	}
}

export default GameState;
