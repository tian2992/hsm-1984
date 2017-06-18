import BootState from 'states/BootState';
import LoadState from 'states/LoadState';
import GameState from 'states/GameState';
const Phaser = require('Phaser');

class Game extends Phaser.Game {
  constructor () {
    super(1280, 400, Phaser.AUTO, 'content', null);

    const { state } = this;

    state.add('BootState', BootState);
    state.add('LoadState', LoadState);
    state.add('GameState', GameState);
    state.start('BootState');
  }

  create () {
    this.scale.ScaleManager.forceOrientation(true, false);
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  }
}

new Game();
