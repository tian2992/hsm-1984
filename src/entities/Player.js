const Phaser = require('Phaser');
let spawnY;
let gravity = 1000;
let totalJumps = 2;

class Player extends Phaser.Sprite {
  constructor (game, center, asset, frame) {
    super(game, center.x, center.y, asset, frame);
    this.game = game;
    this.game.stage.addChild(this);
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = gravity;
    this.game.input.mouse.capture = true;
    this.jumpsLeft = this.jumpsLeft;
    this.canJump = true;
    this.score = 0;
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
    spawnY = center.y;
  }

  bounceOutOfScene (onCompleteFn) {
    const tween = this.game.add.tween(this);
    this.body.gravity.y = 0;
    this.body.collideWorldBounds = false;
    tween.to({y: -this.game.world.height}, 2000, Phaser.Easing.Bounce.Out);
    tween.onComplete.add(() => {
      onCompleteFn();
      console.log(spawnY);
      const falltween = this.game.add.tween(this);
      falltween.to({y: spawnY}, 1000, Phaser.Easing.Bounce.In);
      falltween.onComplete.add(() => {
        this.body.gravity.y = gravity;
        this.body.collideWorldBounds = true;
      });
      falltween.start();
    }, this);
    tween.start();
  }

  swapAssets (name) {
    this.loadTexture(name, 0);
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
  }

  update () {
    if (this.body.blocked.down) {
      this.jumpsLeft = totalJumps;
    }
    if (this.game.input.activePointer.isDown && this.jumpsLeft > 0 && this.canJump) {
      this.body.velocity.y = -500;
      this.jumpsLeft--;
      this.canJump = false;
    }
    if (this.game.input.activePointer.leftButton.isUp) {
      this.canJump = true;
    }
  }
}

export default Player;
