const Phaser = require('Phaser');

class LoadState extends Phaser.State {
  preload () {
    this.progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progressBar');
    this.progressBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.progressBar);

    this.load.image('square', 'assets/sprites/ui/square.png');

    this.load.image('background', 'assets/sprites/backgrounds/background.png');
    this.load.image('groundGrass', 'assets/sprites/backgrounds/groundGrass.png');
    this.load.image('groundIce', 'assets/sprites/backgrounds/groundIce.png');
    this.load.image('groundDirt', 'assets/sprites/backgrounds/groundDirt.png');

    this.load.spritesheet('playa', 'assets/sprites/players/Player/player_tilesheet.png', 80, 110, 3);
    this.load.spritesheet('adventurer', 'assets/sprites/players/Adventurer/adventurer_tilesheet.png', 80, 110, 3);

    this.load.audio('theme', ['assets/audio/1984.mp3']);

    this.load.json('states', 'assets/data/states.json');
  }

  create () {
    this.state.start('GameState');
  }
}

export default LoadState;
