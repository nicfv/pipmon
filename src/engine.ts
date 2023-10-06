import { Color } from './lib/color';
import { Size } from './lib/size';

/**
 * Handles main game runtime functions and graphical display.
 */
export class Engine {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly keysDown: Array<string>;
    private frame: number;
    /**
     * Create a new game engine.
     * @param gamePx The game size in pixels
     * @param display The actual display port size, in pixes
     * @param framesPerSecond The number of frames to compute and render every second
     * @param background The background color
     */
    constructor(public readonly gamePx: Size, display: Size, private readonly framesPerSecond: number, background: Color) {
        this.frame = 0;
        this.keysDown = [];
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvas.tabIndex = 0; // So it can be selected.
        this.canvas.width = gamePx.width;
        this.canvas.height = gamePx.height;
        this.canvas.style.background = background.getRGB();
        this.canvas.style.width = display.width + 'px';
        this.canvas.style.height = display.height + 'px';
        this.canvas.style.imageRendering = 'pixelated';
    }
    /**
     * Start the game loop.
     * @param parent The game window will be shown within this element.
     * @param logic This is the game's main loop function. It should return an array of `Drawable` in order of render priority.
     * @param handler This function handles user keyboard input.
     */
    public start(parent: Element, logic: (frame: number) => Array<Drawable>, handler: (e: InputEvent) => void) {
        parent.appendChild(this.canvas);
        this.canvas.focus();
        this.canvas.addEventListener('keydown', e => {
            e.preventDefault();
            const key = e.key.toLowerCase();
            if (!this.keysDown.includes(key)) {
                this.keysDown.push(key); // Add key if it does not exist.
                handler(new InputEvent(key, true));
            }
        });
        this.canvas.addEventListener('keyup', e => {
            e.preventDefault();
            const key = e.key.toLowerCase(),
                index = this.keysDown.indexOf(key);
            if (index >= 0) {
                this.keysDown.splice(index, 1); // Remove key if it exists.
                handler(new InputEvent(key, false));
            }
        });
        setInterval(() => {
            if (this.canvas === document.activeElement) {
                this.context.clearRect(0, 0, this.gamePx.width, this.gamePx.height);
                const drawables = logic(this.frame++).reverse();
                for (const drawable of drawables) {
                    drawable.draw(this.context);
                }
            }
        }, 1000 / this.framesPerSecond);
    }
    /**
     * Check if a key is currently pressed. Not case sensitive.
     */
    public isKeyDown(key: string): boolean {
        return this.keysDown.includes(key.toLowerCase());
    }
}

/**
 * Describes a user input action.
 */
export class InputEvent {
    constructor(public readonly key: string, public readonly pressed: boolean) { }
}

/**
 * Base interface in which all visible game objects must be derived.
 */
export interface Drawable {
    /**
     * Implement this function to draw the object in the game.
     */
    draw(context: CanvasRenderingContext2D): void;
}