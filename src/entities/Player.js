class Player extends Phaser.Sprite {

	constructor(game, center, asset, frame) {
        super(game, center.x, center.y, asset, frame);
        this.game = game;
        this.game.stage.addChild(this);
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 1000;
	}

    update() {
        if (this.body.blocked.down) {
            this.body.velocity.y = -500;
        }
    }
}

export default Player;