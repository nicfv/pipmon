import { Drawable } from '../engine';
import { Vec2 } from '../lib/vec';

/**
 * Represents an image to be rendered in the game.
 */
export class Sprite implements Drawable {
    private readonly sprite: HTMLImageElement;
    /**
     * Create a new instance of a sprite.
     * @param source The image source URI/URL
     * @param position The starting position of this sprite
     */
    constructor(source: string, private readonly position: Vec2) {
        this.sprite = new Image();
        this.sprite.src = source;
    }
    /**
     * Change the source of the image.
     */
    protected setImage(source: string): void {
        this.sprite.src = source;
    }
    /**
     * Move the sprite by some amount.
     */
    public move(direction: Vec2) {
        this.position.x += direction.x;
        this.position.y += direction.y;
    }
    public draw(context: CanvasRenderingContext2D): void {
        context.drawImage(this.sprite, this.position.x, this.position.y);
    }
}

/**
 * Create a new animation. The `animationSpeed` is the number of game frames in between animation frames.
 */
export class Animation {
    constructor(public readonly sources: Array<string>, public readonly animationSpeed: number, public readonly loop: boolean) { }
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
     */
    constructor(private readonly animations: { [name: string]: Animation }, position: Vec2) {
        super(Object.values(animations)[0].sources[0], position);
        this.currentAnimationName = Object.keys(animations)[0];
        this.frame = 0;
        this.complete = false;
    }
    /**
     * Set the current animation name for this animated sprite. Starts the animation from the beginning.
     */
    public setAnimation(animationName: string): void {
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
            animationFrames = currentAnimation.sources.length,
            idealImageIndex = Math.floor(this.frame++ / currentAnimation.animationSpeed),
            realImageIndex = currentAnimation.loop ? idealImageIndex % animationFrames : animationFrames - 1;
        this.setImage(currentAnimation.sources[realImageIndex]);
        this.complete = currentAnimation.loop && idealImageIndex >= animationFrames;
        return this.complete;
    }
}