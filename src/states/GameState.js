import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';

class GameState extends Phaser.State {

	create() {
		const center = { x: this.game.world.centerX, y: this.game.world.centerY / 4 }
		this.music = this.game.add.audio('theme');
        this.music.play();

		this.background = this.game.add.group();
		this.background.create(new Parallaxer(this.game, 0, 0, 2380, 480, 'background', -0.5, 0));
		
		this.foreground = this.game.add.group();
		const floor = new Parallaxer(this.game, 0, this.game.world.bounds.height - 70, 2380, 70, 'foreground', -2, 0);
		floor.enableBody = true;
		floor.immovable = true;
		this.foreground.create(floor);

    	const player = new Player(this.game, center, 'playa');
		this.physics.arcade.collide(player, floor);
	}
 }

export default GameState;
