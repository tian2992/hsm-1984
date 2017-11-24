const Phaser = require('phaser');
let assetsLoaded = false;

class LoadState extends Phaser.State {
  preload () {
    this.game.load.onLoadComplete.add(this.loadComplete, this);
    this.progressBar = this.add.sprite(0, this.game.world.height - 10, 'progressBar');
    this.progressBar.anchor.setTo(0);
    this.load.setPreloadSprite(this.progressBar);
    this.load.image('square', 'assets/sprites/ui/square.png');
    this.load.image('credits', 'assets/sprites/ui/1984.png');
    
    this.load.image('collider', 'assets/sprites/collider.png');
    // for area 1
    this.load.image('mountains', 'assets/sprites/backgrounds/Area1/mountains.png');
    this.load.image('bgTrees', 'assets/sprites/backgrounds/Area1/bgTrees.png');
    this.load.image('fgTrees', 'assets/sprites/backgrounds/Area1/fgTrees.png');
    this.load.image('ground', 'assets/sprites/backgrounds/Area1/ground.png');
    this.load.spritesheet('stage1_obstacle1', 'assets/sprites/items/Obstacles/Area1/Piedra Stage1.png', 55, 55, 2);
    this.load.spritesheet('stage1_obstacle2', 'assets/sprites/items/Obstacles/Area1/sonic Stage1.png', 55, 55, 2);
    // for area 2
    this.load.image('silouettes', 'assets/sprites/backgrounds/Area2/silouettes.png');
    this.load.image('lightning', 'assets/sprites/backgrounds/Area2/lightning.png');
    this.load.image('groundAcuatic', 'assets/sprites/backgrounds/Area2/ground.png');
    this.load.spritesheet('stage2_obstacle1', 'assets/sprites/items/Obstacles/Area2/Medusa Stage2.png', 55, 55, 2);
    this.load.spritesheet('stage2_obstacle2', 'assets/sprites/items/Obstacles/Area2/Pescado Stage2.png', 55, 55, 2);
    // for area 3
    this.load.image('volcanes', 'assets/sprites/backgrounds/Area3/volcanes.png');
    this.load.image('volcanicbg', 'assets/sprites/backgrounds/Area3/bg.png');
    this.load.image('volcanicGround', 'assets/sprites/backgrounds/Area3/ground.png');
    this.load.spritesheet('stage3_obstacle1', 'assets/sprites/items/Obstacles/Area3/Piedra Stage3.png', 55, 55, 2);
    this.load.spritesheet('stage3_obstacle2', 'assets/sprites/items/Obstacles/Area3/redsonic Stage3.png', 55, 55, 2);
    // for area 4
    this.load.image('stars', 'assets/sprites/backgrounds/Area4/stars.png');
    this.load.image('planets', 'assets/sprites/backgrounds/Area4/planets.png');
    this.load.spritesheet('stage4_obstacle1', 'assets/sprites/items/Obstacles/Area4/Piedra Stage4.png', 55, 55, 2);
    // for area 5
    this.load.image('fondo', 'assets/sprites/backgrounds/Area5/fondo.png');
    this.load.image('edificios2', 'assets/sprites/backgrounds/Area5/edificios2.png');
    this.load.image('edificios', 'assets/sprites/backgrounds/Area5/edificios.png');
    this.load.image('calle', 'assets/sprites/backgrounds/Area5/calle.png');
    this.load.spritesheet('stage5_obstacle1', 'assets/sprites/items/Obstacles/Area5/popito Stage 5.png', 55, 55, 2);

    this.load.image('letterBox', 'assets/sprites/ui/letterBox.png');

    // items
    this.load.spritesheet('coin', 'assets/sprites/items/fichagira.png', 55, 55, 4);
    this.load.spritesheet('rock', 'assets/sprites/items/S1piedra.png', 50, 55, 3);
    // characters
    this.load.spritesheet('charli', 'assets/sprites/players/charli.png', 55, 55, 4);
    this.load.spritesheet('meza', 'assets/sprites/players/mezaswim.png', 55, 55, 3);
    this.load.spritesheet('pelon', 'assets/sprites/players/pelon.png', 55, 55, 4);
    this.load.spritesheet('pug', 'assets/sprites/players/pug.png', 82, 42, 3);
    // ending/ title state?
    this.load.image('logo', 'assets/sprites/backgrounds/Bar/logo.png');
    this.load.image('scenary', 'assets/sprites/backgrounds/Bar/escenario.png');
    this.load.image('people1', 'assets/sprites/backgrounds/Bar/gente1.png');
    this.load.image('people2', 'assets/sprites/backgrounds/Bar/gente2.png');
    this.load.image('Bglight1', 'assets/sprites/backgrounds/Bar/light1.png');
    this.load.image('Bglight2', 'assets/sprites/backgrounds/Bar/light2.png');

    this.load.image('light', 'assets/sprites/backgrounds/Bar/Bar_light.png');
    this.load.image('pelon1', 'assets/sprites/backgrounds/Bar/pelon1.png');
    this.load.image('mesa1', 'assets/sprites/backgrounds/Bar/mesa1.png');
    this.load.image('charli1', 'assets/sprites/backgrounds/Bar/chali1.png');
    this.load.image('pug1', 'assets/sprites/backgrounds/Bar/pug1.png');
    this.load.spritesheet('restart', 'assets/sprites/ui/boton_restart.png', 46, 23, 2);
    this.load.spritesheet('fb', 'assets/sprites/ui/facebook.png', 26, 28, 2);
    this.load.spritesheet('insta', 'assets/sprites/ui/insta.png', 26, 28, 2);
    this.load.spritesheet('tw', 'assets/sprites/ui/twiter.png', 26, 28, 2);
    this.load.spritesheet('yt', 'assets/sprites/ui/youtube.png', 26, 28, 2);

    // test ui
    this.load.spritesheet('boton', 'assets/sprites/ui/boton.png', 79, 25, 2);
    this.load.bitmapFont('nokia16', 'assets/fonts/nokia16.png', 'assets/fonts/nokia16.xml');
    this.load.audio('theme', ['assets/audio/1984.mp3']);
    this.load.json('states', 'assets/data/states.json');
    this.load.json('lyrics', 'assets/data/lyrics.json');

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
