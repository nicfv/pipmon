import { Engine } from './engine';
import { FloorMap, MapTile } from './gobj/map';
import { Player } from './gobj/player';
import { Color } from './lib/color';
import { Size } from './lib/size';
import { Vec2 } from './lib/vec';

const game = new Engine(new Size(160, 144), new Size(800, 600), 60, new Color(0, 0, 0, 1));

window.addEventListener('load', () => {
    const player = new Player(new Vec2(0, 0));
    let map = new FloorMap([]);
    fetch('data/map-test.json').then(value => value.json()).then(json => map = new FloorMap(json));
    game.start(document.body, f => {
        if (game.isKeyDown('a')) {
            player.walk('left');
        } else if (game.isKeyDown('d')) {
            player.walk('right');
        } else if (game.isKeyDown('w')) {
            player.walk('up');
        } else if (game.isKeyDown('s')) {
            player.walk('down');
        } else {
            player.walk('none');
        }
        return [player, map];
    }, console.log);
});
