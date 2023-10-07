import { Rectangle } from '../lib/rect';
import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';

/**
 * Contains a sequence of uniformly-sized images from a tileset source.
 */
export class Tileset {
    private readonly tileset: HTMLImageElement;
    private loaded: boolean;
    /**
     * Generate a sequence of uniformly-sized images from a tileset source.
     * @param source The image source URI/URL
     * @param tileSize The uniform size of each tile
     */
    constructor(source: string, private readonly tileSize: Size) {
        this.tileset = new Image();
        this.tileset.src = source;
        this.tileset.addEventListener('load', () => this.loaded = true);
        this.loaded = false;
    }
    /**
     * Return the tile from the specified position in the tileset. Optionally include a render offset from the top-left and flip type.
     */
    public getTile(coordinates: Vec2, offset: Vec2 = new Vec2(0, 0), flipType: Flip = new Flip(false, false)): Tile {
        const source = new Rectangle(coordinates.x * this.tileSize.width, coordinates.y * this.tileSize.height, this.tileSize.width, this.tileSize.height);
        return new Tile((context, position) => {
            if (!this.loaded) {
                return;
            }
            const tilesetRect = new Rectangle(0, 0, this.tileset.width, this.tileset.height);
            // console.log(source, tilesetRect, source.intersect(tilesetRect));
            if (!source.intersect(tilesetRect)) {
                throw new Error('Tile coordinates are out of bounds.')
            }
            context.save();
            context.translate(position.x + offset.x * flipType.scaleX, position.y + offset.y * flipType.scaleY);
            context.scale(Math.sign(flipType.scaleX), Math.sign(flipType.scaleY));
            context.drawImage(this.tileset,
                source.x, source.y, source.width, source.height,
                0, 0, this.tileSize.width * flipType.scaleX, this.tileSize.height * flipType.scaleY);
            context.restore();
        });
    }
}

/**
 * Represents a single drawable image element from a tileset.
 */
export class Tile {
    /**
     * Initialize a new instance of `Tile`. Should only be called from the `Tileset` class.
     * @param draw Draw the tile at the specified position on the game window.
     */
    constructor(public readonly draw: (context: CanvasRenderingContext2D, position: Vec2) => void) { }
}

/**
 * Define the image flip type for this tile.
 */
export class Flip {
    public readonly scaleX: number;
    public readonly scaleY: number;
    /**
     * Create a new flip configuration.
     */
    constructor(x: boolean, y: boolean) {
        this.scaleX = x ? -1 : 1;
        this.scaleY = y ? -1 : 1;
    }
}