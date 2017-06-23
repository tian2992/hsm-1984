import { Sprite, Easing } from 'Phaser';

class Item extends Sprite {
  constructor (game, center, asset, score, frame) {
    super(game, center.x, center.y, asset, frame);
    this.game = game;
    this.game.stage.addChild(this);
    this.game.physics.arcade.enable(this);
    this.visible = false;
    this.body.enable = false;
    this.score = score;
    this.type = 'item';
  }

  setPosition (x, y) {
    this.position.x = x;
    this.position.y = y;
    this.game.add.tween(this).to({ y: y + 10 }, 500, Easing.Linear.None, true, y, 500, true);
  }

  update () {
    this.position.x -= 2.5;
  }
}

export default Item;
