import RainbowText from 'objects/RainbowText';
import Parallaxer from 'entities/Parallaxer';

class GameState extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY / 4 }

		this.music = this.game.add.audio('theme');
        this.music.play();

		//new Parallaxer(this.game, 0, 0, 2380, 480, 'background', -0.5, 0);
		//new Parallaxer(this.game, 0, this.game.world.bounds.height - 70, 2380, 70, 'foreground', -2, 0);

		this.tileSize = 70;

		//TODO: functionize
		//initiate groups
		this.floors = this.game.add.group();
		this.floors.enableBody = true;
		var newItem;

		for(var i=0; i<12; i++) {
			newItem = this.floors.create(i * this.tileSize, this.game.world.height - this.tileSize, 'foreground');
			newItem.body.immovable = true;
			newItem.body.velocity.x = this.levelSpeed;            
		}

		this.lastFloor = newItem;
		

		//Add the playa
    	this.player = this.game.add.sprite(
			this.game.world.centerX, 
			200,
			//this.game.world.height - (this.spacing * 2 + (3 * this.tileHeight)),
			'playa');
	
		//Set the players anchor point to be in the middle horizontally
		//this.player.anchor.setTo(0.5, 1.0);
	
		//Enable physics on the player
		this.game.physics.arcade.enable(this.player);
	
		//Make the player fall by applying gravity
		this.player.body.gravity.y = 0.2;
	
		//Make the player collide with the game boundaries 
		this.player.body.collideWorldBounds = true;
	
		//Make the player bounce a little
		this.player.body.bounce.y = 0.1;

		//enable physics on the player
		this.game.physics.arcade.enable(this.player);

		//player gravity
		this.player.body.gravity.y = 1000;


		let text = new RainbowText(this.game, center.x, center.y, "Hot Sugar Project!");
		text.anchor.set(0.5);
	}

	update() {
		this.game.physics.arcade.collide(this.player, this.floors);
	
		if(this.player.body.position.y >= this.game.world.height - this.player.body.height){
			//todo fix
			console.log("sucks");
		}
	}
 }

export default GameState;
