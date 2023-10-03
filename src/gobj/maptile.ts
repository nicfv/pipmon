import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';
import { AnimatedSprite, Animation } from './sprite';
import { Tileset } from './tileset';

/**
 * Define the different tile types that can appear in the map.
 */
type MapTileType = 'grass' | 'water';

/**
 * Defines a tile within the overworld in the game.
 */
export class MapTile extends AnimatedSprite<MapTileType> {
    private static readonly TS = new Tileset('img/ts2.png', new Size(16, 16));
    /**
     * Create a new tile for the map.
     */
    constructor(type: MapTileType, position: Vec2) {
        super({
            'grass': new Animation([
                MapTile.TS.getTile(new Vec2(0, 0)),
                MapTile.TS.getTile(new Vec2(1, 0)),
            ], 100, true),
            'water': new Animation([
                MapTile.TS.getTile(new Vec2(1, 23)),
            ], 100, true),
        }, position);
        super.setAnimation(type);
        super.start();
    }
}