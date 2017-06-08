class Player extends Phaser.Sprite {

	constructor(game, x, y, text) {

		super(game, x, y, text, { font: "45px Arial", fill: "#ff0044", align: "center" });

        game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
		this.game.stage.addChild(this);

	}

}

export default Player;