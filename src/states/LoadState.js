const Phaser = require('phaser');
let assetsLoaded = false;

class LoadState extends Phaser.State {
  preload () {
    this.game.load.onLoadComplete.add(this.loadComplete, this);
    this.progressBar = this.add.sprite(0, this.game.world.height - 10, 'progressBar');
    this.progressBar.anchor.setTo(0);
    this.load.setPreloadSprite(this.progressBar);
    
    this.load.image('collider', 'assets/sprites/collider.png');
    // for area 1
    this.load.image('mountains', 'assets/sprites/backgrounds/Area1/plx-1.png');
    this.load.image('bgTrees', 'assets/sprites/backgrounds/Area1/plx-2.png');
    this.load.image('fgTrees', 'assets/sprites/backgrounds/Area1/plx-3.png');
    this.load.image('ground', 'assets/sprites/backgrounds/Area1/plx-4.png');

    this.load.image('letterBox', 'assets/sprites/ui/letterBox.png');

    // items
    this.load.spritesheet('coin', 'assets/sprites/items/coin.png', 55, 55, 4);
    // characters
    this.load.spritesheet('pelon', 'assets/sprites/players/run.png', 21, 33, 8);
    // ending/ title state?
    this.load.spritesheet('restart', 'assets/sprites/ui/boton_restart.png', 46, 23, 2);

    // test ui
    this.load.spritesheet('boton', 'assets/sprites/ui/boton.png', 79, 25, 2);
    this.load.bitmapFont('nokia16', 'assets/fonts/nokia16.png', 'assets/fonts/nokia16.xml');
    this.load.audio('theme', ['assets/audio/stage2.ogg']);
    this.load.json('states', 'assets/data/states.json');

    this.game.load.start();
  }

  loadComplete () {
    assetsLoaded = true;
  }

  update () {
    if (this.cache.isSoundDecoded('theme') && assetsLoaded) {
      return this.state.start('TitleState');
    }
  }
}

export default LoadState;
