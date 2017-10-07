const Phaser = require('phaser');
let spawnY;
let gravity = 980;
let normalGravity = 980;
let specialGravity = 150;
let totalJumps = 2;
let jumpHeight = -350;
let normalJump = -350;
let specialJump = -175;
let damageTween;
let name;

class Player extends Phaser.Sprite {
  constructor (game, center, asset, frame) {
    super(game, center.x, center.y, asset, frame);
    this.game = game;
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.game.input.mouse.capture = true;
    this.jumpsLeft = this.jumpsLeft;
    this.canJump = true;
    this.score = 0;
    this.animations.add('walk', [0, 1, 2]);
    if (asset === 'pug') {
      this.body.width = 42;
      this.body.height = 42;
      this.animations.add('jump', [0, 1, 2]);
      gravity = specialGravity;
      jumpHeight = specialJump;
    } else {
      this.body.width = 30;
      this.body.height = 55;
      this.animations.add('jump', [3]);
      gravity = normalGravity;
      jumpHeight = normalJump;
    }
    this.name = asset;
    this.body.gravity.y = gravity;
    this.animations.play('walk', 8, true);
    spawnY = center.y;
    damageTween = this.game.add.tween(this).to({ alpha: 0 }, 50, Phaser.Easing.Linear.None, false, 1, 5, true);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  bounceOutOfScene (onCompleteFn) {
    const tween = this.game.add.tween(this);
    this.body.gravity.y = 0;
    this.body.collideWorldBounds = false;
    tween.to({y: -this.game.world.height}, 2000, Phaser.Easing.Bounce.Out);
    tween.onComplete.add(() => {
      onCompleteFn();
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
    this.animations.add('walk', [0, 1, 2]);
    this.animations.play('walk', 8, true);
    if (name === 'pug') {
      this.body.width = 42;
      this.body.height = 42;
      this.animations.add('jump', [0, 1, 2]);
      gravity = specialGravity;
      jumpHeight = specialJump;
    } else {
      this.body.width = 30;
      this.body.height = 55;
      this.animations.add('jump', [3]);
      gravity = normalGravity;
      jumpHeight = normalJump;
    }
    this.name = name;
  }

  doDamage () {
    damageTween.start();
  }

  update () {
    if (this.body.blocked.down) {
      this.body.velocity.y = 0;
      this.animations.play('walk', 8, true);
      this.jumpsLeft = totalJumps;
    }
    if ((this.game.input.activePointer.isDown || this.cursors.up.isDown) && this.jumpsLeft > 0 && this.canJump) {
      this.body.velocity.y = jumpHeight;
      this.jumpsLeft--;
      this.canJump = false;
      this.animations.play('jump', 8, this.name === 'pug');
    }
    if (this.game.input.activePointer.isUp) {
      this.canJump = true;
    }
  }
}

export default Player;
