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
     * @param parent The parent element
     */
    constructor(public readonly gamePx: Size, display: Size, private readonly framesPerSecond: number, background: Color, parent: Element) {
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
        parent.appendChild(this.canvas);
    }
    /**
     * Start the game loop.
     * @param logic This is the game's main loop function. It should return an array of `Drawable` to render.
     * @param handler This function handles user keyboard input.
     */
    public start(logic: (frame: number) => Array<Drawable>, handler: (e: InputEvent) => void) {
        this.canvas.addEventListener('keydown', e => {
            e.preventDefault();
            const key = e.key.toLowerCase();
            if (!this.keysDown.includes(key)) {
                this.keysDown.push(key); // Add key if it does not exist.
            }
            handler(new InputEvent(key, true, this.keysDown));
        });
        this.canvas.addEventListener('keyup', e => {
            e.preventDefault();
            const key = e.key.toLowerCase(),
                index = this.keysDown.indexOf(key);
            if (index >= 0) {
                this.keysDown.splice(index, 1); // Remove key if it exists.
            }
            handler(new InputEvent(key, false, this.keysDown));
        });
        setInterval(() => {
            if (this.canvas === document.activeElement) {
                const drawables = logic(this.frame++);
                for (const drawable of drawables) {
                    drawable.draw(this.context);
                }
            }
        }, 1000 / this.framesPerSecond);
    }
    /**
     * Check if a key is currently pressed.
     */
    public isKeyDown(key: string): boolean {
        return this.keysDown.includes(key.toLowerCase());
    }
}

export class InputEvent {
    constructor(public readonly key: string, public readonly pressed: boolean, public readonly keysDown: Array<string>) {
        this.key = key.toLowerCase();
    }
}

export interface Drawable {
    draw(context: CanvasRenderingContext2D): void;
}