
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
  constructor(game, x, y, width, height, key, hSpeed, vSpeed) {
    super(game, x, y, width, height, key);
    this.game = game;
    this.game.stage.addChild(this);
    this.speed = {
            x: hSpeed,
            y: vSpeed
    };
  }

  update () {
      this.tilePosition.x += this.speed.x;
      this.tilePosition.y += this.speed.y;
  }
}

export default Parallaxer;
