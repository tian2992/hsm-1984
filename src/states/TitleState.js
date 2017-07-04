const Phaser = require('phaser');

class TitleScene extends Phaser.State {
  create () {
    const horizontalPosition = (this.game.world.width / 2) - this.game.cache.getImage('greenButton').width / 2;
    this.playButton = this.add.button(horizontalPosition, this.game.world.height / 2, 'greenButton', this.startGame, this);
  }

  startGame () {
    this.state.start('GameState');
  }
}

export default TitleScene;
