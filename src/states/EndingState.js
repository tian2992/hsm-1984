const Phaser = require('phaser');

let backgrounds;
let entities;
let overlays;
let timer;
let charli, mesa, pelon, pug, light, bgLights, logo, gente1, gente2;
let restart, fb, tw, insta;
const logicWorldBounds = {width: 320, height: 200};
let currentLight = 'Bglight1';

class EndingScene extends Phaser.State {
  create () {
    backgrounds = this.game.add.group();
    entities = this.game.add.group();
    overlays = this.game.add.group();
    bgLights = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('Bglight1').height, 'Bglight1');
    backgrounds.add(bgLights);
    logo = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('logo').height, 'logo');
    backgrounds.add(logo);
    backgrounds.add(this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('scenary').height, 'scenary'));
    light = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('light').height, 'light');
    entities.add(light);
    pelon = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('pelon1').height, 'pelon1');
    entities.add(pelon);
    charli = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('charli1').height, 'charli1');
    entities.add(charli);
    mesa = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('mesa1').height, 'mesa1');
    entities.add(mesa);
    pug = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('pug1').height, 'pug1');
    entities.add(pug);
    gente1 = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('people1').height, 'people1');
    entities.add(gente1);
    gente2 = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('people2').height, 'people2');
    entities.add(gente2);

    restart = this.game.add.button(0, logicWorldBounds.height - this.game.cache.getImage('restart').height, 'restart', this.restartGame, this, 2, 1, 0);
    fb = this.game.add.button(logicWorldBounds.width - 26 * 3, logicWorldBounds.height - this.game.cache.getImage('fb').height - 2, 'fb', this.facebook, this, 2, 1, 0);
    tw = this.game.add.button(logicWorldBounds.width - 26 * 2, logicWorldBounds.height - this.game.cache.getImage('tw').height - 2, 'tw', this.twitter, this, 2, 1, 0);
    insta = this.game.add.button(logicWorldBounds.width - 26, logicWorldBounds.height - this.game.cache.getImage('insta').height - 2, 'insta', this.instagram, this, 2, 1, 0);

    overlays.add(this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('letterBox').height, 'letterBox'));
    overlays.add(restart);
    overlays.add(fb);
    overlays.add(insta);
    this.game.add.tween(charli.position).to({x: charli.position.x + 2}, 500, Phaser.Easing.Back.InOut, true, 500, 2, true).loop(true);
    this.game.add.tween(mesa.position).to({x: mesa.position.x - 2}, 500, Phaser.Easing.Back.InOut, true, 500, 5, true).loop(true);
    this.game.add.tween(pelon.position).to({y: mesa.position.y - 2}, 500, Phaser.Easing.Back.InOut, true, 500, 10, true).loop(true);
    this.game.add.tween(light.position).to({y: light.position.y + 2}, 500, Phaser.Easing.Back.InOut, true, 500, 15, true).loop(true);
    this.game.add.tween(pug.position).to({y: pug.position.y - 2}, 500, Phaser.Easing.Back.InOut, true, 500, 1, true).loop(true);
    this.game.add.tween(gente1.position).to({y: gente1.position.y + 2}, 800, Phaser.Easing.Back.InOut, true, 800, 1, true).loop(true);
    this.game.add.tween(gente2.position).to({y: gente2.position.y + 2}, 500, Phaser.Easing.Back.InOut, true, 500, 1, true).loop(true);

    timer = this.game.time.create(false);
    timer.loop(1000, () => {
      currentLight = currentLight === 'Bglight1' ? 'Bglight2' : 'Bglight1';
      bgLights.loadTexture(currentLight, 0);
    }, this);
    timer.start();
  }

  startGame () {
    this.state.start('TitleState');
  }

  restartGame () {
    this.state.start('GameState');
  }

  twitter () {
    window.open('https://twitter.com/hot_sugar_mama', '_blank', this);
  }

  facebook () {
    window.open('https://www.facebook.com/hotsugarmama', '_blank', this);
  }

  instagram () {
    window.open('https://www.instagram.com/hotsugarmama', '_blank', this);
  }
}

export default EndingScene;
