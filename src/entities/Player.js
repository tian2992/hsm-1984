class Player extends Phaser.Sprite {

	constructor(game, center, asset, frame) {
        super(game, center.x, center.y, asset, frame);
        this.game = game;
        this.game.stage.addChild(this);
        this.game.physics.arcade.enable(this);
        this.body.gravity.y = 0.2;
        this.body.collideWorldBounds = true;
        this.body.bounce.y = 0.1;
        this.body.gravity.y = 1000;
	}
}

export default Player;