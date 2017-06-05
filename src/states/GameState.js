import RainbowText from 'objects/RainbowText';
import Parallaxer from 'entities/Parallaxer';

class GameState extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY / 4 }

		this.music = this.game.add.audio('theme');
        this.music.play();

		new Parallaxer(this.game, 0, 0, 2380, 480, 'background', -0.5, 0);
		new Parallaxer(this.game, 0, this.game.world.bounds.height - 70, 2380, 70, 'foreground', -2, 0);

		let text = new RainbowText(this.game, center.x, center.y, "Hot Sugar Project!");
		text.anchor.set(0.5);
	}

}

export default GameState;
