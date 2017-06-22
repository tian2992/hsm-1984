import { Group } from 'Phaser';
import Item from '../entities/Item';

const itemHeights = [160, 200, 250];
const minimumTimeToSpawnItem = 2000;
const maximumTimeToSpawnItem = 4000;

class Items extends Group {
  constructor (game) {
    super(game);
    this.game = game;
    this.minimumTimeToSpawnItem = minimumTimeToSpawnItem;
    this.maximumTimeToSpawnItem = maximumTimeToSpawnItem;
    this.itemsSpawned = 0;
  }

  spawnItem (player, timer) {
    const selectedItem = super.getRandom();
    if (selectedItem.visible && selectedItem.inCamera) {
      this.spawnItem(player, timer);
      return;
    }
    const randomHeight = this.game.rnd.pick(itemHeights);
    selectedItem.position.x = this.game.world.width + selectedItem.width;
    selectedItem.position.y = randomHeight;
    console.log('item spawned at ' + selectedItem.position);
    selectedItem.visible = true;
    selectedItem.body.enable = true;

    const timerdelay = this.game.rnd.between(minimumTimeToSpawnItem, maximumTimeToSpawnItem);
    timer.add(timerdelay, () => { this.spawnItem(player, timer); }, this);
  }

  createAreaItems (collectableType) {
    super.forEach((item) => {
      super.remove(item);
    });

    console.log(collectableType);

    collectableType.forEach((item) => {
      const initialPosition = {x: this.game.world.centerX, y: this.game.world.centerY};
      const newItem = new Item(this.game, initialPosition, item.sprite, item.score);
      super.add(newItem);
    });
  }

  resolveItemCollision (player, item) {
    player.score += item.score;
    player.doDamage();
    console.log('player score is now ' + player.score);
    item.visible = false;
    item.body.enable = false;
  }
}

export default Items;
