const Phaser = require('Phaser');

class BootState extends Phaser.State {
  preload () {
    this.game.stage.backgroundColor = '#000';
    this.load.image('progressBar', 'assets/sprites/ui/progressbar.png');
  }

  create () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('LoadState');
  }
}

export default BootState;
