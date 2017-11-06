import { Group } from 'phaser';
import Item from '../entities/Item';

let itemHeights = [];
let scoreText;
let scoreTemplate = '0000';

class Items extends Group {
  constructor (game, text, minimumTimeToSpawnItem, maximumTimeToSpawnItem) {
    super(game);
    this.game = game;
    this.minimumTimeToSpawnItem = minimumTimeToSpawnItem;
    this.maximumTimeToSpawnItem = maximumTimeToSpawnItem;
    this.itemsSpawned = 0;
    itemHeights = [game.world.height * 0.02, game.world.height * 0.30, game.world.height * 0.67];
    scoreText = text;
  }

  spawnItem (timer) {
    if (typeof this.activeItems !== 'undefined') {
      const selected = this.game.rnd.pick(this.activeItems);
      const initialPosition = {x: this.game.world.centerX, y: this.game.world.centerY};
      const selectedItem = new Item(this.game, initialPosition, selected.sprite, selected.score, selected.type);
      super.add(selectedItem);
      const randomHeight = selectedItem.type === 'obstacle' ? itemHeights[2] : this.game.rnd.pick(itemHeights.slice(0, 2));
      selectedItem.setPosition(this.game.world.width + selectedItem.width, randomHeight);
    }

    const timerdelay = this.game.rnd.between(this.minimumTimeToSpawnItem, this.maximumTimeToSpawnItem);
    timer.add(timerdelay, () => { this.spawnItem(timer); }, this);
  }

  createAreaItems (areaItems) {
    super.forEach((item) => {
      item.destroy();
    });

    this.activeItems = areaItems;
  }

  resolveItemCollision (player, item) {
    player.score += item.score;
    if (player.score < 0) {
      player.score = 0;
    }
    let paddedNumber = scoreTemplate.substring((player.score + '').length, 4) + player.score;
    scoreText.text = paddedNumber;
    if (item.type === 'obstacle') {
      player.doDamage();
    }
    item.setPosition(this.game.world.width + item.width, item.height);
    item.destroy();
  }
}

export default Items;
