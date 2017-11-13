const Phaser = require('phaser');

const resolution = {
  minWidth: 320,
  minHeight: 200,
  maxWidth: 960,
  maxHeight: 540
};

class BootState extends Phaser.State {
  preload () {
    this.game.stage.backgroundColor = '#000';
    this.load.image('progressBar', 'assets/sprites/ui/progressbar.png');
  }

  create () {
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setMinMax(resolution.minWidth, resolution.minHeight, resolution.maxWidth, resolution.maxHeight);
    this.game.stage.smoothed = false;
    this.game.scale.refresh();
    this.game.rnd.sow([Math.random()]);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('LoadState');
  }
}

export default BootState;
