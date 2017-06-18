class Item extends Phaser.Sprite {

	constructor(game, center, asset, frame) {
        super(game, center.x, center.y, asset, frame);
        this.game = game;
        this.game.stage.addChild(this);
        this.game.physics.arcade.enable(this);
        this.points = 30;
        this.type = 'item';
	}

    update() {
        this.position.x -= 2.5;
    }
}

export default Item;