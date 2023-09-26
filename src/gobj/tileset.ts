import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';

/**
 * Contains a sequence of uniformly-sized images from a tileset source.
 */
export class Tileset {
    private readonly tileset: HTMLImageElement;
    private readonly tiles: Array<Array<Tile>>;
    /**
     * Generate a sequence of uniformly-sized images from a tileset source.
     * @param source The image source URI/URL
     * @param tileSize The uniform size of each tile
     */
    constructor(source: string, tileSize: Size) {
        this.tileset = new Image();
        this.tileset.src = source;
        this.tiles = [];
        for (let x = 0; x < this.tileset.width; x += tileSize.width) {
            this.tiles.push([]);
            for (let y = 0; y < this.tileset.height; y += tileSize.height) {
                this.tiles[x].push(new Tile((context, position) => context.drawImage(this.tileset, x, y, tileSize.width, tileSize.height, position.x, position.y, tileSize.width, tileSize.height)));
            }
        }
    }
    /**
     * Return the tile from the specified position in the tileset.
     */
    public getTile(coordinates: Vec2): Tile {
        return this.tiles[coordinates.x][coordinates.y];
    }
}

/**
 * Represents a single drawable image element from a tileset.
 */
export class Tile {
    /**
     * Initialize a new instance of `Tile`. Should only be called in the `Tileset` class.
     * @param draw Draw the tile at the specified position on the game window.
     */
    constructor(public readonly draw: (context: CanvasRenderingContext2D, position: Vec2) => void) { }
}