import { Group } from 'phaser';
import Item from '../entities/Item';

const minimumTimeToSpawnItem = 2000;
const maximumTimeToSpawnItem = 4000;
let activeItems;
let itemHeights = [];

class Items extends Group {
  constructor (game) {
    super(game);
    this.game = game;
    this.minimumTimeToSpawnItem = minimumTimeToSpawnItem;
    this.maximumTimeToSpawnItem = maximumTimeToSpawnItem;
    this.itemsSpawned = 0;
    itemHeights = [game.world.height * 0.2, game.world.height * 0.35, game.world.height * 0.5];
  }

  spawnItem (timer) {
    const selected = this.game.rnd.pick(activeItems);
    const initialPosition = {x: this.game.world.centerX, y: this.game.world.centerY};
    const selectedItem = new Item(this.game, initialPosition, selected.sprite, selected.score);
    super.add(selectedItem);
    const randomHeight = this.game.rnd.pick(itemHeights);
    selectedItem.setPosition(this.game.world.width + selectedItem.width, randomHeight);
    console.log('item spawned at ' + selectedItem.position);

    const timerdelay = this.game.rnd.between(minimumTimeToSpawnItem, maximumTimeToSpawnItem);
    timer.add(timerdelay, () => { this.spawnItem(timer); }, this);
  }

  createAreaItems (collectableType) {
    super.forEach((item) => {
      item.destroy();
    });

    activeItems = collectableType;
    console.log(collectableType);
  }

  resolveItemCollision (player, item) {
    player.score += item.score;
    player.doDamage();
    console.log('player score is now ' + player.score);
    item.setPosition(this.game.world.width + item.width, item.height);
    item.destroy();
  }
}

export default Items;
