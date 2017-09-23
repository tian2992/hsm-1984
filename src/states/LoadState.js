const Phaser = require('phaser');
let assetsLoaded = false;

class LoadState extends Phaser.State {
  preload () {
    this.game.load.onLoadComplete.add(this.loadComplete, this);
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
    // for area 2
    this.load.image('silouettes', 'assets/sprites/backgrounds/Area2/silouettes.png');
    this.load.image('lightning', 'assets/sprites/backgrounds/Area2/lightning.png');
    this.load.image('groundAcuatic', 'assets/sprites/backgrounds/Area2/ground.png');
    // for area 3
    this.load.image('volcanes', 'assets/sprites/backgrounds/Area3/volcanes.png');
    this.load.image('volcanicbg', 'assets/sprites/backgrounds/Area3/bg.png');
    this.load.image('volcanicGround', 'assets/sprites/backgrounds/Area3/ground.png');
    // for area 3
    this.load.image('stars', 'assets/sprites/backgrounds/Area4/stars.png');
    this.load.image('planets', 'assets/sprites/backgrounds/Area4/planets.png');

    this.load.image('letterBox', 'assets/sprites/ui/letterBox.png');

    // items
    this.load.spritesheet('coin', 'assets/sprites/items/fichagira.png', 55, 55, 4);
    this.load.spritesheet('rock', 'assets/sprites/items/S1piedra.png', 50, 55, 3);
    // characters
    this.load.spritesheet('charli', 'assets/sprites/players/charli.png', 55, 55, 4);
    this.load.spritesheet('meza', 'assets/sprites/players/meza.png', 55, 55, 4);
    this.load.spritesheet('pancho', 'assets/sprites/players/pancho.png', 55, 55, 4);
    this.load.spritesheet('pelon', 'assets/sprites/players/pelon.png', 55, 55, 4);
    this.load.spritesheet('pug', 'assets/sprites/players/pug.png', 82, 42, 3);

    // test ui
    this.load.image('blueButton', 'assets/sprites/ui/blue_button09.png');
    this.load.image('greenButton', 'assets/sprites/ui/green_button09.png');
    this.load.image('yellowButton', 'assets/sprites/ui/yellow_button09.png');

    this.load.audio('theme', ['assets/audio/1984.mp3']);
    this.load.json('states', 'assets/data/states.json');
    this.load.json('lyrics', 'assets/data/lyrics.json');

    this.load.bitmapFont('nokia16', 'assets/fonts/nokia16.png', 'assets/fonts/nokia16.xml');
    this.game.load.start();
  }

  loadComplete () {
    console.log('Load Complete');
    assetsLoaded = true;
  }

  update () {
    if (this.cache.isSoundDecoded('theme') && assetsLoaded) {
      return this.state.start('TitleState');
    }
  }
}

export default LoadState;
