import { Drawable } from '../engine';
import { Vec2 } from '../lib/vec';
import { Tile } from './tileset';

/**
 * Represents an image to be rendered in the game.
 */
export class Sprite implements Drawable {
    /**
     * Create a new instance of a sprite.
     * @param tile The sprite image to render
     * @param position The starting position of this sprite
     * @param offset The optional render offset, defaults to (0, 0)
     */
    constructor(private tile: Tile, private readonly position: Vec2, private readonly offset: Vec2 = new Vec2(0, 0)) { }
    /**
     * Change the source of the image.
     */
    protected setImage(tile: Tile): void {
        this.tile = tile;
    }
    /**
     * Move the sprite by some amount.
     */
    protected move(direction: Vec2) {
        this.position.x += direction.x;
        this.position.y += direction.y;
    }
    public draw(context: CanvasRenderingContext2D): void {
        this.tile.draw(context, new Vec2(this.position.x + this.offset.x, this.position.y + this.offset.y));
    }
}

/**
 * Create a new animation. The `animationSpeed` is the number of game frames in between animation frames.
 */
export class Animation {
    constructor(public readonly tiles: Array<Tile>, public readonly animationSpeed: number, public readonly loop: boolean) { }
}

/**
 * Represents an animated version of `Sprite`
 */
export class AnimatedSprite extends Sprite {
    private currentAnimationName: string;
    private frame: number;
    private complete: boolean;
    /**
     * Create a new animated sprite.
     * @param animations An map of possible animations this sprite can have
     * @param position The starting position for this animated sprite
     * @param offset The optional render offset, defaults to (0, 0)
     */
    constructor(private readonly animations: { [name: string]: Animation }, position: Vec2, offset: Vec2 = new Vec2(0, 0)) {
        super(Object.values(animations)[0].tiles[0], position, offset);
        this.currentAnimationName = Object.keys(animations)[0];
        this.frame = 0;
        this.complete = false;
    }
    /**
     * Set the current animation name for this animated sprite. Starts the animation from the beginning.
     */
    protected setAnimation(animationName: string): void {
        if (Object.keys(this.animations).includes(animationName)) {
            if (this.currentAnimationName !== animationName || this.complete) {
                this.currentAnimationName = animationName;
                this.frame = 0;
                this.complete = false;
            }
        } else {
            throw new Error('Animation `' + animationName + '` is not valid.');
        }
    }
    /**
     * Animate this sprite. Call this function during the game's main logic loop. Returns whether the animation is complete.
     */
    public animate(): boolean {
        const currentAnimation = this.animations[this.currentAnimationName],
            animationFrames = currentAnimation.tiles.length,
            idealImageIndex = Math.floor(this.frame++ / currentAnimation.animationSpeed),
            realImageIndex = currentAnimation.loop ? idealImageIndex % animationFrames : animationFrames - 1;
        this.setImage(currentAnimation.tiles[realImageIndex]);
        this.complete = currentAnimation.loop && idealImageIndex >= animationFrames;
        return this.complete;
    }
}