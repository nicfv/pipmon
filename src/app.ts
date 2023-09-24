import { Engine } from './engine';
import { AnimatedSprite, Animation } from './gobj/sprite';
import { Color } from './lib/color';
import { Size } from './lib/size';
import { Vec2 } from './lib/vec';

const game = new Engine(new Size(160, 144), new Size(800, 600), 60, new Color(0, 0, 0, 1));

window.addEventListener('load', () => {
    const playerSprite = new AnimatedSprite({
        'down': new Animation(['img/r1.png', 'img/r2.png'], 15, true),
        'up': new Animation(['img/g1.png', 'img/g2.png'], 15, true),
        'left': new Animation(['img/b1.png', 'img/b2.png'], 15, true),
        'right': new Animation(['img/y1.png', 'img/y2.png'], 15, true),
    }, new Vec2(50, 5));
    console.log(game.gamePx);
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
