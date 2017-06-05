import BootState from 'states/BootState';
import LoadState from 'states/LoadState';
import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(640, 480, Phaser.AUTO, 'content', null);
		this.state.add('BootState', BootState);
		this.state.add('LoadState', LoadState);
		this.state.add('GameState', GameState);
		this.state.start('BootState');
	}

}

new Game();
