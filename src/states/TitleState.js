const Phaser = require('phaser');

let backgrounds;
let logo;
let button;
const logicWorldBounds = {width: 320, height: 200};

class TitleScene extends Phaser.State {
  create () {
    button = this.game.add.sprite(logicWorldBounds.width / 2 - 40, logicWorldBounds.height - this.game.cache.getImage('boton').height * 3, 'boton');
    button.animations.add('idle', [0, 1]);
    button.animations.play('idle', 2, true);
    backgrounds = this.game.add.group();
    // logo = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('logo').height, 'logo');
    // this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('credits').height, 'credits');
    // backgrounds.add(logo);
    backgrounds.add(button);
  }

  update () {
    if ((this.game.input.activePointer.isDown)) {
      this.state.start('GameState');
    }
  }
}

export default TitleScene;
