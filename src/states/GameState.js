import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';
import Collectables from 'groups/Collectables';
import { State, Signal } from 'phaser';
import ScreenFader from 'objects/ScreenFader';

let player;
let timer;
let currentTime;
let states;
let fader;
let prettyTime;
let backgrounds;
let entities;
let items;
let overlays;
let worldBounds = {width: 0, height: 0};
const logicWorldBounds = {width: 320, height: 200};
const worldHeightDifferential = 20;
const playerHeightDifferential = 24;
let timerText, scoreText, playerText, areaText;
let isDebug = false;

class GameState extends State {
  create () {
    worldBounds.width = logicWorldBounds.width;
    worldBounds.height = logicWorldBounds.height - playerHeightDifferential;
    this.game.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    states = this.game.cache.getJSON('states');
    const center = { x: this.game.world.centerX - 100, y: this.game.world.bounds.height - 200 };
    this.music = this.game.add.audio('theme');
    this.music.play();
    backgrounds = this.game.add.group();
    entities = this.game.add.group();
    overlays = this.game.add.group();
    overlays.add(this.game.add.sprite(0, 0, 'letterBox'));
    overlays.add(this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('letterBox').height, 'letterBox'));
    timerText = overlays.add(this.game.add.bitmapText(260, 2, 'nokia16', '00:00', 16));
    scoreText = overlays.add(this.game.add.bitmapText(80, 2, 'nokia16', '0000', 16));
    playerText = overlays.add(this.game.add.bitmapText(4, 2, 'nokia16', 'Charli', 16));
    items = new Collectables(this.game, scoreText);
    this.createBackgrounds(states[0].state);
    items.createAreaItems(states[0].state.items);
    player = new Player(this.game, center, 'charli');
    player.body.onCollide = new Signal();
    player.body.onCollide.add(items.resolveItemCollision, this);
    entities.add(player);
    fader = new ScreenFader(this.game, {x: 0, y: 0}, 'progressBar', '#F0000');
    currentTime = 0;
    timer = this.game.time.create(false);
    timer.loop(1000, this.checkState, this);
    const timerdelay = this.game.rnd.between(items.minimumTimeToSpawnItem, items.maximumTimeToSpawnItem);
    timer.add(timerdelay, () => { items.spawnItem(timer); }, items);
    timer.start();

  }

  createBackgrounds (state) {
    backgrounds.forEach((bg) => {
      bg.kill();
    });
    this.game.stage.backgroundColor = state.bgColor || '#FFFFF';
    state.backgrounds.forEach((bg) => {
      let height = bg.useWorldHeight ? logicWorldBounds.height - worldHeightDifferential : this.game.cache.getImage(bg.background).height - worldHeightDifferential;
      const newParallaxer = new Parallaxer(this.game, 0, logicWorldBounds.height - height, logicWorldBounds.width, height, bg.background);
      newParallaxer.setSpeed(bg.speed.x, bg.speed.y);
      backgrounds.add(newParallaxer);
    });
  }

  update () {
    this.game.physics.arcade.collide(player, items);
  }

  render () {
    if (isDebug) {
      items.forEach((item) => {
        this.game.debug.body(item, 'blue', false);
      });
    }
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
    timerText.text = prettyTime;

    states.forEach((item) => {
      let state = item.state;
      if (state.time === prettyTime) {
        console.log(`doing state change! ${state.time}   ${currentTime}`);
        items.createAreaItems(state.items);
        fader.fadeIn(800);
        return player.bounceOutOfScene(() => {
          this.createBackgrounds(state);
          player.swapAssets(state.player);
          playerText.text = state.playerName;
          fader.fadeOut(500);
        });
      }
    });
  }
 }

export default GameState;
