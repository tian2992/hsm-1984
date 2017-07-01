const Phaser = require('Phaser');

class LoadState extends Phaser.State {
  preload () {
    this.progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progressBar');
    this.progressBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.progressBar);
    this.load.bitmapFont('font', 'assets/fonts/nokia16.png', 'assets/fonts/nokia16.xml');

    this.load.image('square', 'assets/sprites/ui/square.png');

    this.load.image('collider', 'assets/sprites/collider.png');
    // for area 1
    this.load.image('mountains', 'assets/sprites/backgrounds/Area1/mountains.png');
    this.load.image('bgTrees', 'assets/sprites/backgrounds/Area1/bgTrees.png');
    this.load.image('fgTrees', 'assets/sprites/backgrounds/Area1/fgTrees.png');
    this.load.image('ground', 'assets/sprites/backgrounds/Area1/ground.png');

    this.load.image('letterBox', 'assets/sprites/ui/letterBox.png');

    // items
    this.load.spritesheet('coin', 'assets/sprites/items/fichagira.png', 55, 55, 4);
    // characters
    this.load.spritesheet('charli', 'assets/sprites/players/charli.png', 55, 55, 4);
    this.load.spritesheet('meza', 'assets/sprites/players/meza.png', 55, 55, 4);
    this.load.spritesheet('pancho', 'assets/sprites/players/pancho.png', 55, 55, 4);
    this.load.spritesheet('pelon', 'assets/sprites/players/pelon.png', 55, 55, 4);

    this.load.audio('theme', ['assets/audio/1984.mp3']);

    this.load.json('states', 'assets/data/states.json');
  }

  create () {
    this.state.start('GameState');
  }
}

export default LoadState;
