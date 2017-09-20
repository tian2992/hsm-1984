import { Sprite, Easing } from 'phaser';

class Item extends Sprite {
  constructor (game, center, asset, score, type, frame) {
    super(game, center.x, center.y, asset, frame);
    this.game = game;
    this.game.stage.addChild(this);
    this.game.physics.arcade.enable(this);
    this.body.width = 30;
    this.body.height = 30;
    this.score = score;
    this.type = type;
    this.animations.add('idle', [0, 1, 2, 3]);
    this.animations.play('idle', 8, true);
  }

  setPosition (x, y) {
    this.position.x = x;
    this.position.y = y;
    if (this.type !== 'obstacle') {
      this.game.add.tween(this).to({ y: y + 10 }, 500, Easing.Linear.None, true, y, 500, true);
    }
  }

  update () {
    this.position.x -= 3;
  }
}

export default Item;
