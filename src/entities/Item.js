import {Sprite} from 'Phaser';

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
    this.goingUp = false;
    this.floatingTime = 0;
  }

  update () {
    this.floatingtime++;
    this.position.x -= 2.5;
    if (this.goingUp) {
      this.position.y += 0.8;
    } else {
      this.position.y -= 0.8;
    }

    if (this.floatingTime <= 60) {
      this.goingUp = !this.goingUp;
    }
  }
}

export default Item;
