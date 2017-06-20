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
    this.game.add.tween(this).to({ y: center.y + 20 }, 500, Easing.Linear.None, true, center.y - 20, 500, true);
  }

  update () {
    this.position.x -= 2.5;
  }
}

export default Item;
