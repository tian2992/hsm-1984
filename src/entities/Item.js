import { Sprite, Easing } from 'phaser';

class Item extends Sprite {
  constructor (game, center, asset, score, type, frame) {
    super(game, center.x, center.y, asset, frame);
    this.game = game;
    this.game.stage.addChild(this);
    this.game.physics.arcade.enable(this);
    this.score = score;
    this.type = type;
    if (this.type !== 'obstacle') {
      this.body.setSize(30, 30, 5, 20);
      this.animations.add('idle', [0, 1, 2, 3]);
      this.animations.play('idle', 8, true);
    } else {
      this.body.setSize(24, 24, 5, 30);
      this.animations.add('idle', [0, 1]);
      this.animations.play('idle', 4, true);
    }
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
