import { Engine } from './engine';
import { AnimatedSprite, Animation } from './gobj/sprite';
import { Color } from './lib/color';
import { Size } from './lib/size';
import { Vec2 } from './lib/vec';

const game = new Engine(new Size(160, 144), new Size(800, 600), 60, new Color(0, 0, 0, 1));

window.addEventListener('load', () => {
    const playerSprite = new AnimatedSprite({
        'main': new Animation(['https://archives.bulbagarden.net/media/upload/4/47/Puzzle_Challenge_player.png', 'https://archives.bulbagarden.net/media/upload/d/d1/Player_Hey_You_Pikachu.png'], 15, true),
    }, new Vec2(50, 5));
    console.log(game.gamePx);
    game.start(document.body, f => {
        playerSprite.animate(f);
        if (game.isKeyDown('a')) {
            playerSprite.move(new Vec2(-1, 0));
        }
        if (game.isKeyDown('d')) {
            playerSprite.move(new Vec2(1, 0));
        }
        if (game.isKeyDown('w')) {
            playerSprite.move(new Vec2(0, -1));
        }
        if (game.isKeyDown('s')) {
            playerSprite.move(new Vec2(0, 1));
        }
        return [playerSprite];
    }, console.log);
});
