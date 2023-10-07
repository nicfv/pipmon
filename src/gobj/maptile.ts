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
    // TODO: https://www.spriters-resource.com/game_boy_advance/pokemonemerald/
    private static readonly TS = new Tileset('https://www.spriters-resource.com/resources/sheets/59/61816.png', new Size(16, 16));
    private static readonly ANIMATIONS: { [key in MapTileType]: Animation } = {
        'grass': new Animation([
            MapTile.TS.getTile(new Vec2(1, 0)),
        ], 100, true),
        'water': new Animation([
            MapTile.TS.getTile(new Vec2(38, 0)),
        ], 100, true),
    };
    /**
     * Create a new tile for the map.
     */
    constructor(type: MapTileType, position: Vec2) {
        super(MapTile.ANIMATIONS, position);
        super.setAnimation(type);
        super.start();
    }
}