import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';
import Item from 'entities/Item';
import { State, Signal } from 'Phaser';

const itemHeights = [160, 200, 250];
const minimumTimeToSpawnItem = 2000;
const maximumTimeToSpawnItem = 4000;

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
    this.items = this.game.add.group();
    this.createBackgrounds(states[0].state);
    this.createAreaItems(states[0].state);
    player = new Player(this.game, center, 'playa');
    player.body.onCollide = new Signal();
    player.body.onCollide.add(this.resolveItemCollision, this);
    this.entities.add(player);
    currentTime = 0;
    timer = this.game.time.create(false);
    timer.loop(1000, this.checkState, this);
    const timerdelay = this.game.rnd.between(minimumTimeToSpawnItem, maximumTimeToSpawnItem);
    timer.add(timerdelay, this.spawnItem, this);
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

  spawnItem () {
    const selectedItem = this.items.getRandom();
    if (selectedItem.visible === true && selectedItem.inCamera) {
      this.spawnItem();
      return;
    }
    const randomHeight = this.game.rnd.pick(itemHeights);
    selectedItem.position.x = player.position.x + 1000;
    selectedItem.position.y = randomHeight;
    console.log('item spawned at ' + selectedItem.position);
    selectedItem.visible = true;
    selectedItem.body.enable = true;

    const timerdelay = this.game.rnd.between(minimumTimeToSpawnItem, maximumTimeToSpawnItem);
    timer.add(timerdelay, this.spawnItem, this);
  }

  createAreaItems (state) {
    this.items.forEach((item) => {
      this.items.remove(item);
    });

    state.items.forEach((item) => {
      const initialPosition = {x: this.game.world.centerX, y: this.game.world.centerY};
      const newItem = new Item(this.game, initialPosition, item.sprite, item.score);
      this.items.add(newItem);
    });
  }

  resolveItemCollision (player, item) {
    player.score += item.score;
    console.log('player score is now ' + player.score);
    item.visible = false;
    item.body.enable = false;
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
        this.createAreaItems(state);
        return player.bounceOutOfScene(() => {
          this.createBackgrounds(state);
          player.swapAssets(state.player);
        });
      }
    });
  }
 }

export default GameState;
