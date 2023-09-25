import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';

/**
 * Generate a sequence of images from a tileset source.
 */
export class Tileset {
    private readonly tileset: HTMLImageElement;
    constructor(source: string, public readonly tileSize: Size) {
        this.tileset = new Image();
        this.tileset.src = source;
    }
    public drawTile(context: CanvasRenderingContext2D, coordinates: Vec2, position: Vec2): void {
        context.drawImage(this.tileset, coordinates.x * this.tileSize.width, coordinates.y * this.tileSize.height, this.tileSize.width, this.tileSize.height, position.x, position.y, this.tileSize.width, this.tileSize.height)
    }
    public getTile(coordinates: Vec2): Tile {
        return new Tile(this, coordinates);
    }
}

export class Tile {
    constructor(private readonly tileset: Tileset, private readonly coordinates: Vec2) { }
    public drawTile(context: CanvasRenderingContext2D, position: Vec2): void {
        this.tileset.drawTile(context, this.coordinates, position);
    }
}