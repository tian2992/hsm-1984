
class Parallaxer extends Phaser.TileSprite {

  /**
   * 
   * @param {*} game 
   * @param {*} x 
   * @param {*} y 
   * @param {*} width 
   * @param {*} height 
   * @param {*} key 
   * @param {*} hSpeed pixels
   * @param {*} vSpeed 
   */
  constructor(game, x, y, width, height, key) {
    super(game, x, y, width, height, key);
    this.game = game;
    this.game.stage.addChild(this);
  }

  update () {
    if (!this.speed) {
      return;
    }
    this.tilePosition.x += this.speed.x;
    this.tilePosition.y += this.speed.y;
  }

  setSpeed(hSpeed, vSpeed) {
    this.speed = {
            x: hSpeed,
            y: vSpeed
    };
  }
}

export default Parallaxer;
