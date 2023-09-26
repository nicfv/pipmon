import { Engine } from './engine';
import { AnimatedSprite, Animation } from './gobj/sprite';
import { Tileset } from './gobj/tileset';
import { Color } from './lib/color';
import { Size } from './lib/size';
import { Vec2 } from './lib/vec';

const game = new Engine(new Size(160, 144), new Size(800, 600), 60, new Color(0, 0, 0, 1));

window.addEventListener('load', () => {
    const tileset = new Tileset('https://opengameart.org/sites/default/files/forestmock.gif', new Size(16, 16));
    const playerSprite = new AnimatedSprite({
        'down': new Animation([tileset.getTile(new Vec2(0, 2)), tileset.getTile(new Vec2(0, 3))], 15, true),
        'up': new Animation([tileset.getTile(new Vec2(1, 2)), tileset.getTile(new Vec2(1, 3))], 15, true),
        'left': new Animation([tileset.getTile(new Vec2(2, 2)), tileset.getTile(new Vec2(2, 3))], 15, true),
        'right': new Animation([tileset.getTile(new Vec2(3, 2)), tileset.getTile(new Vec2(3, 3))], 15, true),
    }, new Vec2(50, 5));
    game.start(document.body, f => {
        if (game.isKeyDown('a')) {
            playerSprite.move(new Vec2(-1, 0));
            playerSprite.setAnimation('left');
            playerSprite.animate();
        }
        if (game.isKeyDown('d')) {
            playerSprite.move(new Vec2(1, 0));
            playerSprite.setAnimation('right');
            playerSprite.animate();
        }
        if (game.isKeyDown('w')) {
            playerSprite.move(new Vec2(0, -1));
            playerSprite.setAnimation('up');
            playerSprite.animate();
        }
        if (game.isKeyDown('s')) {
            playerSprite.move(new Vec2(0, 1));
            playerSprite.setAnimation('down');
            playerSprite.animate();
        }
        return [playerSprite];
    }, console.log);
});
