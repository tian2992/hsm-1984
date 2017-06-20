import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';
import Items from 'groups/Items';
import { State, Signal } from 'Phaser';

let player;
let timer;
let currentTime;
let states;

class GameState extends State {
  create () {
    states = this.game.cache.getJSON('states');
    const center = { x: this.game.world.centerX - 250, y: this.game.world.bounds.height - 200 };
    this.music = this.game.add.audio('theme');
    this.music.play();
    this.background = this.game.add.group();
    this.entities = this.game.add.group();

    this.items = new Items(this.game);
    this.createBackgrounds(states[0].state);
    this.items.createAreaItems(states[0].state);
    player = new Player(this.game, center, 'playa');
    player.body.onCollide = new Signal();
    player.body.onCollide.add(this.items.resolveItemCollision, this);
    this.entities.add(player);
    currentTime = 0;
    timer = this.game.time.create(false);
    timer.loop(1000, this.checkState, this);
    const timerdelay = this.game.rnd.between(this.items.minimumTimeToSpawnItem, this.items.maximumTimeToSpawnItem);
    timer.add(timerdelay, () => { this.items.spawnItem(player, timer); }, this.items);
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

  render () {
    this.game.debug.body(player);
    this.items.forEachAlive((item) => { this.game.debug.body(item); }, this);
  }

  update () {
    this.game.physics.arcade.collide(player, this.items);
  }

  checkState () {
    currentTime++;
    states.forEach((item) => {
      let state = item.state;
      if (state.time === currentTime) {
        console.log(`doing state change! ${state.time}   ${currentTime}`);
        this.items.createAreaItems(state);
        return player.bounceOutOfScene(() => {
          this.createBackgrounds(state);
          player.swapAssets(state.player);
        });
      }
    });
  }
 }

export default GameState;
