import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';
import ScreenFader from 'objects/ScreenFader';
const Phaser = require('Phaser');

let player;
let timer;
let currentTime;
let states;
let fader;
let prettyTime;

class GameState extends Phaser.State {
  create () {
    states = this.game.cache.getJSON('states');
    const center = { x: this.game.world.centerX - 250, y: this.game.world.bounds.height - 200 };
    this.music = this.game.add.audio('theme');
    this.music.play();
    this.background = this.game.add.group();
    this.entities = this.game.add.group();
    this.overlays = this.game.add.group();
    this.createBackgrounds(states[0].state);
    player = new Player(this.game, center, 'playa');
    this.entities.add(player);
    fader = new ScreenFader(this.game, {x: 0, y: 0}, 'progressBar', '#F0000');
    currentTime = 0;
    timer = this.game.time.create(false);
    timer.loop(1000, this.checkState, this);
    timer.start();
  }

  createBackgrounds (state) {
    this.background.forEach((bg) => {
      this.background.remove(bg);
    });

    state.backgrounds.forEach((bg) => {
      let height = bg.useWorldHeight ? this.game.world.height : this.game.cache.getImage(bg.background).height;
      const newParallaxer = new Parallaxer(this.game, 0, this.game.world.bounds.height - height, this.game.world.width, height, bg.background);
      newParallaxer.setSpeed(bg.speed.x, bg.speed.y);
      this.background.add(newParallaxer);
    });
  }

  update () {

  }

  secondstoMinutes (value) {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    let stringMinutes = minutes.toString().length > 1 ? minutes : `0${minutes}`;
    let stringSeconds = seconds.toString().length > 1 ? seconds : `0${seconds}`;
    return `${stringMinutes}:${stringSeconds}`;
  }

  checkState () {
    currentTime++;
    prettyTime = this.secondstoMinutes(currentTime);
    this.game.debug.text(prettyTime, 10, 20);
    states.forEach((item) => {
      let state = item.state;
      if (state.time === prettyTime) {
        console.log(`doing state change! ${state.time}   ${currentTime}`);
        fader.fadeIn(800);
        return player.bounceOutOfScene(() => {
          this.createBackgrounds(state);
          player.swapAssets(state.player);
          fader.fadeOut(500);
        });
      }
    });
  }
 }

export default GameState;
