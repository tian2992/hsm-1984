import BootState from 'states/BootState';
import LoadState from 'states/LoadState';
import GameState from 'states/GameState';
import TitleState from 'states/TitleState';

const Phaser = require('Phaser');

class Game extends Phaser.Game {
  constructor () {
    super(960, 480, Phaser.AUTO, 'content', null);

    const { state } = this;

    state.add('BootState', BootState);
    state.add('LoadState', LoadState);
    state.add('GameState', GameState);
    state.add('TitleState', TitleState);
    state.start('BootState');
  }

  create () {
    this.scale.ScaleManager.forceOrientation(true, false);
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  }
}

new Game();
