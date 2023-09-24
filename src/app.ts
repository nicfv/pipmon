import { Engine } from './engine';
import { Color } from './lib/color';
import { Size } from './lib/size';

const game = new Engine(new Size(160, 144), new Size(800, 600), 60, new Color(255, 90, 0, 0.6));

window.addEventListener('load', () => {
    console.log(game.gamePx);
    game.start(document.body, f => [], console.log);
});
