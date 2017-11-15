const Phaser = require('phaser');

let backgrounds;
let logo;
let button;
const logicWorldBounds = {width: 320, height: 200};

class TitleScene extends Phaser.State {
  create () {
    button = this.game.add.sprite(logicWorldBounds.width / 2 - 40, logicWorldBounds.height - this.game.cache.getImage('boton').height, 'boton');
    button.animations.add('idle', [0, 1]);
    button.animations.play('idle', 2, true);
    backgrounds = this.game.add.group();
    logo = this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('logo').height, 'logo');
    this.artByText = this.game.add.bitmapText(20, logicWorldBounds.height * 5 / 6, 'nokia16', 'Art:\nJUL', 16);
    this.artByText.align = 'left';
    this.artByTex2 = this.game.add.bitmapText(45, logicWorldBounds.height * 5 / 6 + 16, 'nokia16', '10', 16);
    this.artByTex2.tint = 0xff00ff;
    this.programmingByText = this.game.add.bitmapText(logicWorldBounds.width - 100, logicWorldBounds.height * 5 / 6, 'nokia16', 'Code:\n502 Studios', 16);
    this.programmingByText.align = 'right';
    backgrounds.add(logo);
    backgrounds.add(button);
  }

  update () {
    if ((this.game.input.activePointer.isDown)) {
      this.state.start('GameState');
    }
  }
}

export default TitleScene;
