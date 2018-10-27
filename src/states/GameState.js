import Parallaxer from 'entities/Parallaxer';
import Player from 'entities/Player';
import Collectables from 'groups/Collectables';
import { State, Signal, Keyboard } from 'phaser';
import ScreenFader from 'objects/ScreenFader';

let player;
let timer;
let currentTime;
let states;
let currentStage = 0;
let fader;
let prettyTime;
let backgrounds;
let entities;
let items;
let obstacles;
let overlays;
let questions;
let worldBounds = {width: 0, height: 0};
let lyricsText;
let lyricsData;
let skipKey;
const logicWorldBounds = {width: 320, height: 200};
const worldHeightDifferential = 20;
const playerHeightDifferential = 18;
let timerText, scoreText, playerText;
let isDebug = false;
let skipToNext = false;

class GameState extends State {
  create () {
    worldBounds.width = logicWorldBounds.width;
    worldBounds.height = logicWorldBounds.height - playerHeightDifferential;
    this.game.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    states = this.game.cache.getJSON('states');
    // lyricsData = this.game.cache.getJSON('lyrics');
    if (isDebug) {
      skipKey = this.game.input.keyboard.addKey(Keyboard.S);
      skipKey.onDown.add(() => { skipToNext = true; }, this);
    }

    // Adding visual elements
    const center = { x: this.game.world.centerX - 100, y: this.game.world.bounds.height - 200 };
    this.music = this.game.add.audio('theme');
    this.music.restart();
    this.setPauseOnVisibilityLost();

    backgrounds = this.game.add.group();
    entities = this.game.add.group();
    overlays = this.game.add.group();
    overlays.add(this.game.add.sprite(0, 0, 'letterBox'));
    overlays.add(this.game.add.sprite(0, logicWorldBounds.height - this.game.cache.getImage('letterBox').height, 'letterBox'));
    // this.lyrics = this.game.add.bitmapText(this.game.world.centerX, logicWorldBounds.height - this.game.cache.getImage('letterBox').height, 'nokia16', '', 16);
    // this.lyrics.align = 'center';
    // this.lyrics.x = this.game.world.centerX;
    // lyricsText = overlays.add(this.lyrics);
    timerText = overlays.add(this.game.add.bitmapText(260, 2, 'nokia16', '00:00', 16));
    scoreText = overlays.add(this.game.add.bitmapText(130, 2, 'nokia16', '0000', 16));
    playerText = overlays.add(this.game.add.bitmapText(4, 2, 'nokia16', 'Player 1', 16));
    let pauseFunction = this.OnPauseButton(this);
    items = new Collectables(this.game, scoreText, 1000, 2000, pauseFunction);
    // obstacles = new Collectables(this.game, scoreText, 2215, 6458);
    this.createBackgrounds(states[0].state);
    this.createQuestionMenu();
    items.createAreaItems(states[0].state.items);
    // obstacles.createAreaItems(states[0].state.obstacles);
    // Creating player and setting beh.

    player = new Player(this.game, center, 'pelon');
    player.body.onCollide = new Signal();
    player.body.onCollide.add(items.resolveItemCollision, this);
    // player.body.onCollide.add(obstacles.resolveItemCollision, this);
    entities.add(player);
    fader = new ScreenFader(this.game, {x: 0, y: 0}, 'progressBar', '#F0000', 0);
    currentTime = 0;
    timer = this.game.time.create(false);
    timer.loop(1000, this.checkState, this);
    this.itemsAndObstaclesTimer = this.game.time.create(false);
    this.startItemsAndObstacles();
    timer.start();
    this.itemsAndObstaclesTimer.start();
  }

  startItemsAndObstacles () {
    this.itemsAndObstaclesTimer.add(2000, () => { items.spawnItem(this.itemsAndObstaclesTimer); }, this.game);
    // this.itemsAndObstaclesTimer.add(6300, () => { obstacles.spawnItem(this.itemsAndObstaclesTimer); }, this.game);
  }

  setPauseOnVisibilityLost () {
    this.game.onPause.add(function () {
      this.game.sound.pauseAll();
    }, this);

    this.game.onResume.add(function () {
      this.game.sound.resumeAll();
    }, this);
  }

  createQuestionMenu () {
    // let pauseLabel = overlays.add(this.game.add.bitmapText(170, 2, 'nokia16', 'Pause', 16));
    // pauseLabel.inputEnabled = true;
    // pauseLabel.events.onInputUp.add(this.OnPauseButton, this);

    // overlays.add(pauseLabel);
  }

  unpause (event) {
    // Only act if paused
    if (this.game.paused) {
      if (event.x > 100 && event.x < 300 && event.y > logicWorldBounds.height / 2 && event.y < logicWorldBounds.height / 2 + 60) {
        this.game.paused = false;
        questions.destroy();
      }
    }
  }

  OnPauseButton (context) {
    // When the paus button is pressed, we pause the game
    let pause = function () {
      context.game.paused = true;

      questions = context.game.add.group();
      let pauseMenuBackground = context.game.add.sprite(0, logicWorldBounds.height * 0.33, 'letterBox');
      pauseMenuBackground.scale.setTo(0.5, 5);
      questions.add(pauseMenuBackground);

      questions.add(context.game.add.bitmapText(100, logicWorldBounds.height / 2 - 30, 'nokia16', 'Pregunta', 16));
      let button = context.game.add.bitmapText(100, logicWorldBounds.height / 2 + 20, 'nokia16', 'Respuesta 1', 16);
      questions.add(button);
      let button2 = context.game.add.bitmapText(100, logicWorldBounds.height / 2, 'nokia16', 'Respuesta 2', 16);
      questions.add(button2);
      let button3 = context.game.add.bitmapText(100, logicWorldBounds.height / 2 + 40, 'nokia16', 'Respuesta 3', 16);
      questions.add(button3);
      context.input.onUp.add(context.unpause, context);
    };

    return pause;
  }

  setLyricsText (line) {
    // lyricsText.text = line;
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
    this.game.physics.arcade.collide(player, obstacles);
  }

  render () {
    if (isDebug) {
      items.forEach((item) => {
        this.game.debug.body(item, 'blue', false);
      });
      this.game.debug.body(player, 'blue', false);      
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
    // lyricsData.forEach((lyric) => {
      // if (lyric.time === prettyTime) {
      // this.setLyricsText(lyric.data);
      //   this.lyrics.updateText();
      //   this.lyrics.x = this.game.world.centerX - (this.lyrics.textWidth * 0.5);
      // }
    // });
    states.some((item, index, states) => {
      let state = item.state;
      if (isDebug && skipToNext && currentStage + 1 < states.length) {
        state = states[currentStage + 1].state;
        prettyTime = state.time;
        skipToNext = false;
      }
      if (state.time === prettyTime) {
        currentStage++;
        if (state.type === 'ending') {
          fader.fadeIn(800);
          return player.bounceOutOfScene(() => {
            return this.state.start('EndingState', true, false, player.score, fader);
          });
        }
        fader.fadeIn(800);
        this.itemsAndObstaclesTimer.removeAll();
        items.createAreaItems(state.items);
        obstacles.createAreaItems(state.obstacles);
        this.startItemsAndObstacles();
        player.bounceOutOfScene(() => {
          this.createBackgrounds(state);
          player.swapAssets(state.player);
          playerText.text = 'Player 1';
          fader.fadeOut(500);
        });
        return true;
      }
    });
  }
 }

export default GameState;
