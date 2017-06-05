
class LoadState extends Phaser.State {

    preload() {
        this.progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progressBar');
        this.progressBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.progressBar);

        this.load.image('background', 'assets/sprites/backgrounds/background.png');
        this.load.image('foreground', 'assets/sprites/backgrounds/groundGrass.png');

        this.load.audio('theme', ['assets/audio/1984.mp3']);
    };

    create() {
        this.state.start('GameState');
    };

};

export default LoadState;
