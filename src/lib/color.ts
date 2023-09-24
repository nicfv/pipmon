import { JMath } from './math';

/**
 * Represents a color in RGBA format.
 */
export class Color {
    private static readonly RGB_MIN = 0;
    private static readonly RGB_MAX = 255;
    private static readonly ALPHA_MIN = 0;
    private static readonly ALPHA_MAX = 1;
    /**
     * Initialize a new RGBA color.
     * @param red Red value from 0-255
     * @param green Green value from 0-255
     * @param blue Blue value from 0-255
     * @param alpha Alpha (transparency) value from 0-1
     */
    constructor(public readonly red: number, public readonly green: number, public readonly blue: number, public readonly alpha: number) {
        this.red = JMath.clamp(red, Color.RGB_MIN, Color.RGB_MAX);
        this.green = JMath.clamp(green, Color.RGB_MIN, Color.RGB_MAX);
        this.blue = JMath.clamp(blue, Color.RGB_MIN, Color.RGB_MAX);
        this.alpha = JMath.clamp(alpha, Color.ALPHA_MIN, Color.ALPHA_MAX);
    }
    /**
     * Return the string representation of this RGBA color.
     */
    public getRGB(): string {
        return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
    }
}