const Phaser = require('phaser');

class ScreenFader extends Phaser.Sprite {
  constructor (game, center, asset, color, alpha, frame) {
    super(game, center.x, center.y, asset, frame);
    this.game = game;
    this.alpha = alpha;
    this.tint = color;
    this.scale.setTo(this.game.world.width, this.game.world.height);
    this.game.stage.addChild(this);
  }

  fadeIn (speed) {
    const tween = this.game.add.tween(this);
    tween.to({ alpha: 1 }, speed);
    tween.start();
  }

  fadeOut (speed) {
    const tween = this.game.add.tween(this);
    tween.to({ alpha: 0 }, speed);
    tween.start();
  }
}

export default ScreenFader;
