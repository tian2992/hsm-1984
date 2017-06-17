class Player extends Phaser.Sprite {

	constructor(game, center, asset, frame) {
        super(game, center.x, center.y, asset, frame);
        this.game = game;
        this.game.stage.addChild(this);
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 1000;
        this.game.input.mouse.capture = true;
        this.totalJumps = 2;
        this.jumpsLeft = this.jumpsLeft;
        this.canJump = true;
        var walk = this.animations.add('walk');
        this.animations.play('walk', 10, true);
	}

    swapAssets(name) {
        this.loadTexture(name, 0);
        this.animations.add('walk');
        this.animations.play('walk', 10, true);
    }

    update() {
        if (this.body.blocked.down) {
            this.jumpsLeft = this.totalJumps;
        }
        if(this.game.input.activePointer.isDown && this.jumpsLeft > 0 && this.canJump) {
            this.body.velocity.y = -500;
            this.jumpsLeft--;
            this.canJump = false;
        }
        if(this.game.input.activePointer.leftButton.isUp) {
            this.canJump = true;
        }
    }
}

export default Player;