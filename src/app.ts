import { Engine } from './engine';
import { Color } from './lib/color';
import { Size } from './lib/size';


window.addEventListener('load', () => {
    const game = new Engine(new Size(160, 144), new Size(800, 600), 60, new Color(255, 90, 0, 0.6), document.body);
    game.start(f => [], console.log);
});
