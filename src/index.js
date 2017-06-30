import BootState from 'states/BootState';
import LoadState from 'states/LoadState';
import GameState from 'states/GameState';
const Phaser = require('Phaser');

class Game extends Phaser.Game {
  constructor () {
    super(320, 180, Phaser.AUTO, 'content', null, false, true);

    const { state } = this;

    state.add('BootState', BootState);
    state.add('LoadState', LoadState);
    state.add('GameState', GameState);
    state.start('BootState');
  }
}

new Game();
